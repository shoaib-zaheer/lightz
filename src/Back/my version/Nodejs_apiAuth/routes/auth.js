const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('../routes/validation')


router.post('/register', async(req, res) => {
    // validate the data before we make a user
    const {error} = registerValidation(req.body);
    //res.send(error.details[0].message)
    if(error) return res.status(400).send(error.details[0].message);
    
    // Checking if the user already exist in the DB
    const emailExist = await User.findOne({ email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    // hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword

    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err)
    }
});

// login
router.post('/login', async(req, res) => {
    // validate the data before we make a user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        // Checking if the email exists in the DB
        const user = await User.findOne({ email: req.body.email});
        if(!user) return res.status(400).send('Incorrect email or password');
        // checking the password
        const validPWD = await bcrypt.compare(req.body.password, user.password);
        if(!validPWD) return res.status(400).send('Incorrect email or password!')

        // Create and assign a token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
        /////res.send('welcome to LightZ')
})

module.exports = router;