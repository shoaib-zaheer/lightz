const User = require("../models/User");
const Report = require("../models/Report");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailgun = require("mailgun-js");
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });

const _ = require("lodash");

const register1 = async (req, res) => {
  try {
    let { userName, email, password, passwordCheck } = req.body;

    //validation

    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: 'Required fields are empty' });
    }
    else if (password.length < 5) {
      return res.status(400).json({ msg: "Password must have at least 6 characters" });
    }
    else if (password !== passwordCheck) {
      return res.status(400).json({ msg: "Wrong password, enter the same password twice" });
    }
    else if (!userName) {
      userName = email;
    }

    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
      return res.status(400).json({ msg: "An account with this email already exist" });
    }

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      email,
      password: passwordHash,
      userName
    });
    const savedUser = await newUser.save();
    res.json(savedUser);

  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }

};

const login1 = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation

    if (!email || !password) {
      return res.status(400).json({ msg: "Required fields are empty" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "No account with this email has been found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        userName: user.userName,
      }
    })
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }

}

const tokenIsValid = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }

    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false);
    } else {
      return res.json(true);
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getUser = async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    userName: user.userName,
    id: user._id,
  });
}

const report1 = async (req, res) => {
  try {
    const { email, answer, city, state } = req.body;
    const date_time = new Date();
    const formattedDate = `${date_time.toDateString()} ${date_time.toLocaleTimeString()}`
    const stringDate = formattedDate.toString()
console.log(stringDate);

    //validation
    

    if (answer === undefined) {
      return res.status(400).json({ msg: 'Please specify if you have electricity' });
    }

    if (city === undefined) {
      return res.status(400).json({ msg: 'Please specify your city' });
    }


    const newReport = new Report({
      answer,
      cityName: city,
      stateName: state,
      date: stringDate,
    });
    const savedReport = await newReport.save();
    res.json(savedReport);

  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const getReportYes = async (req, res) => {
  try {
    const count = await Report.find().sort({ createdAt: -1 }).limit(50);
    const yes = count.filter(i => i.answer === true);
    // const filteredReports = filterReports(yes);
    res.json(yes);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }

//   function filterReports(uniqueReports) {
//     const emails = [];
//     const reportsFiltered = [];
//     uniqueReports.forEach((report1) => {
//       const email = report1.email;
//       if (emails.includes(email)) {
//         return;
//       } else {
//         emails.push(email);
//         reportsFiltered.push(report1);
//       }
//     });
//     return reportsFiltered;
//   }
 }


const getReportNo = async (req, res) => {
  try {
    const count = await Report.find().sort({ createdAt: -1 }).limit(50);
    const no = count.filter(i => i.answer === false);
    // const filteredReports = filterReports(no);
    res.json(no);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }

//   function filterReports(uniqueReports) {
//     const emails = [];
//     const reportsFiltered = [];
//     uniqueReports.forEach((report1) => {
//       const email = report1.email;
//       if (emails.includes(email)) {
//         return;
//       } else {
//         emails.push(email);
//         reportsFiltered.push(report1);
//       }
//     });
//     return reportsFiltered;
//   }
 }

const getReports24hYes = async (req, res) => {
  try {

    const count = await Report.find({
      createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    })
      .sort({ createdAt: -1 })
      .limit(50);
    const yes = count.filter(i => i.answer === true);
    // const filteredReports = filterReports(yes);
    res.json(yes);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }

//   function filterReports(uniqueReports) {
//     const emails = [];
//     const reportsFiltered = [];
//     uniqueReports.forEach((report1) => {
//       const email = report1.email;
//       if (emails.includes(email)) {
//         return;
//       } else {
//         emails.push(email);
//         reportsFiltered.push(report1);
//       }
//     });
//     return reportsFiltered;
//   }
}

const getReports24hNo = async (req, res) => {
  try {

    const count = await Report.find({
      createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    })
      .sort({ createdAt: -1 })
      .limit(50);
    const no = count.filter(i => i.answer === false);
    // const filteredReports = filterReports(no);
    res.json(no);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }

//   function filterReports(uniqueReports) {
//     const emails = [];
//     const reportsFiltered = [];
//     uniqueReports.forEach((report1) => {
//       const email = report1.email;
//       if (emails.includes(email)) {
//         return;
//       } else {
//         emails.push(email);
//         reportsFiltered.push(report1);
//       }
//     });
//     return reportsFiltered;
//   }
 };

const getReport3dayYes = async (req, res) => {
  try {

    const count = await Report.find({
      createdAt: { $gt: new Date(Date.now() - 72 * 60 * 60 * 1000) },
    })
      .sort({ createdAt: -1 })
      .limit(50);
    const yes = count.filter(i => i.answer === true);
    // const filteredReports = filterReports(yes);
    res.json(yes);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }

  // function filterReports(uniqueReports) {
  //   const emails = [];
  //   const reportsFiltered = [];
  //   uniqueReports.forEach((report1) => {
  //     const email = report1.email;
  //     if (emails.includes(email)) {
  //       return;
  //     } else {
  //       emails.push(email);
  //       reportsFiltered.push(report1);
  //     }
  //   });
  //   return reportsFiltered;
  // }
}
const getReport3dayNo = async (req, res) => {
  try {

    const count = await Report.find({
      createdAt: { $gt: new Date(Date.now() - 72 * 60 * 60 * 1000) },
    })
      .sort({ createdAt: -1 })
      .limit(50);
    const no = count.filter(i => i.answer === false);
    // const filteredReports = filterReports(no);
    res.json(no);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }

  // function filterReports(uniqueReports) {
  //   const emails = [];
  //   const reportsFiltered = [];
  //   uniqueReports.forEach((report1) => {
  //     const email = report1.email;
  //     if (emails.includes(email)) {
  //       return;
  //     } else {
  //       emails.push(email);
  //       reportsFiltered.push(report1);
  //     }
  //   });
  //   return reportsFiltered;
  // }
}

const forgotPassword = (req, res) => {
  const { email } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exists." });
    }

    const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "20m",
    });

    const data = {
      from: "Ligthz@teamapp.com",
      to: `${email}`,
      subject: "Password reset",
      html: `<h2>Please click on the link to reset your password</h2>
              <p>${process.env.CLIENT_URL}/reset-password/${token}</p>`,
    };

    return user.updateOne({ resetLink: token }, function (err, success) {
      if (err) {
        return res.status(400).json({ msg: "Reset link error" });
      }
      mg.messages().send(data, function (err, body) {
        console.log(body);
        if (err) {
          return res.json({
            msg: err.message,
          });
        }
        if (success) {
          return res.json({
            msg: "email has been sent, please reset your password",
          });
        }
      });
    });
  });
};

const resetPassword = (req, res) => {
  const resetLink = req.params.token;
  const { newPassword } = req.body;

  bcrypt.hash(newPassword, 10, async function (err, hashedPass) {
    if (err) {
      res.json({
        msg: "This is an error",
      });
    }

    if (resetLink) {
      jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function (
        // error,
        decodedData
      ) {
        if (err) {
          return res.status(401).json({ msg: "Incorrect Token or expired" });
        }
        User.findOne({ resetLink }, function (err, user) {
          if (err || !user) {
            return res
              .status(400)
              .json({ msg: "User with this token does not exists." });
          }

          const obj = {
            password: hashedPass,
          };

          user = _.extend(user, obj);
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({ error: "reset password error" });
            } else {
              return res
                .status(200)
                .json({ msg: "Your password has been changed" });
            }
          });
        });
      });
    } else {
      return res.status(401).json({ error: "Authentication error" });
    }
  });
};

const getMessage = (req, res) => {
  const { email, message } = req.body;
  const data = {
    from: "Excited User <Ligthz@teamapp.com>",
    to: "hyf.team.lightz@gmail.com",
    subject: `'Hello form ${email}'`,
    text: "Testing some Mailgun awesomness !",
    html: `'<html><h3>Message from the user ${email} here:</h3><h4>${message}</h4> </html>'`,
  };

  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
  return res.json({
    msg: "email has been sent",
  });
};

module.exports = {
  report1,
  login1,
  register1,
  tokenIsValid,
  getUser,
  getReportYes,
  getReportNo,
  forgotPassword,
  resetPassword,
  getMessage,
  getReports24hYes,
  getReports24hNo,
  getReport3dayYes,
  getReport3dayNo,
};
