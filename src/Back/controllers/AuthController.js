const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { use } = require("../routes/auth");

// const register = (req, res, next) => {
//   bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
//     if (err) {
//       res.json({
//         error: err,
//       });
//     }

//     let user = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPass
//     });
//     user
//       .save()
//       .then((user) => {
//         res.json({
//           message: "User Added",
//         });
//       })
//       .catch((error) => {
//         res.json({
//           message: "An error occured!",
//         });
//       });
//   });
// };

// const login = async (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   const user = await User.findOne({
//     $or: [{ email: username }, { phone: username }],
//   });
//   if (user) {
//     bcrypt.compare(password, user.password, function (error, result) {
//       if (error) {
//         res.json({
//           error: error,
//         });
//       }

//       if (result) {
//         let token = jwt.sign({ name: user.name }, "A785$%&&/_tu%", {
//           expiresIn: "1h",
//         });
//         res.json({
//           message: "Login successfull",
//           token,
//         });
//       } else {
//         res.json({
//           message: "Password does not match",
//         });
//       }
//     });
//   } else {
//     res.json({
//       message: "No user found",
//     });
//   }
// };

const register1 = async (req, res) => {
  try {
  let { email, password, passwordCheck, userName } = req.body;

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
  res.json(savedUser);

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
        email: user.email
      }
    })
  }
  catch(err) {
    res.status(500).json({ error: err.message });
  }

}

module.exports = {
  // register,
  login1,
  register1
};


