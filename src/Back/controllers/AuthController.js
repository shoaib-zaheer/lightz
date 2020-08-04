const User = require("../models/User");
const Report = require ("../models/Report")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register1 = async (req, res) => {
  try {
  let {userName, email, password, passwordCheck} = req.body;

  //validation

  if (!email || !password || !passwordCheck) {
    return res.status(400).json({msg: 'Required field are empty'});
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

  const existingUser = await User.findOne({email: email})
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
  res.json(savedUser, { msg: "User added successfuly" });

}
catch(err) {
  res.status(500).json({error: err.message});
}

};

const login1 = async (req, res) => {
  try {
    const {email, password} = req.body;

    //validation

    if(!email || !password) {
      return res.status(400).json({ msg: "Required field are empty" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "No account with this email has been found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        userName: user.userName,
      }
    })
  }
  catch(err) {
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
    const {answer, city, state} = req.body;
    const date_time = new Date();
    const formattedDate = `${date_time.toDateString()} ${date_time.toLocaleTimeString()}`
    const stringDate = formattedDate.toString()
    
  //validation
 
  if (answer === undefined){
    return res.status(400).json({msg: 'Please specify if you have electricity'});
  }
 
  if (city === undefined) {
      return res.status(400).json({msg: 'Please specify your city'});
    } 
  // const existingCity = await Report.findOne({cityName: city})
  //   if (existingCity) {
  //     return res.status(400).json({ msg: "This city was already reported" });
  //   }  
  const newReport = new Report({
      User,
      answer,
      cityName: city,
      stateName: state,
      date:stringDate,
    });
    const savedReport = await newReport.save();
    res.json(savedReport);

}
catch(err) {
  res.status(500).json({error: err.message});
}
}
 const getAllReports = async (req, res, next) => {
   try {
     const reports = await Report.find(req.report1);
     res.send(reports);
     } catch (error) {
     res.json({
       message: error.message,
     });
  }
 };

const getReportYes = async (req, res, next) => {
  try {
    const reports = await Report.find(req.report1);
    const count = reports.filter(i => i.answer === true);
    res.send(count);
    } catch (error) {
    res.json({
      message: error.message,
    });
  }
};



const getReportNo = async (req, res, next) => {
  try {
    const reports = await Report.find(req.report1);
    const count = reports.filter(i => i.answer === false);
    res.send(count);
    } catch (error) {
    res.json({
      message: error.message,
    });
  }
}

module.exports = {
  report1,
  login1,
  register1,
  tokenIsValid,
  getUser,
  getAllReports,
  getReportYes,
  getReportNo,
  
};


