// validations

const Joi = require('@hapi/joi');

// Registration validation
const registerValidation = () => {
     const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(9).required()
   };
   return Joi.Validate(data, schema)
};
   // login validation
   const loginValidation = () => {
    const schema = {
       email: Joi.string().min(6).required().email(),
       password: Joi.string().min(9).required()
  };
   return Joi.Validate(data, schema);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
