const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.signup = async (req, res, next)=> {

        const newUser=await User.create({
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            
        })
    
        const token = signToken(newUser._id)

        res.status(200).json({
              staus: 'success',
              token,
              data: {
                user: newUser,
              },
            })      
    
}



exports.login= async (req, res, next )=> {
        const { email, password } = req.body;

        if (!email || !password) {
          return next(new Error("Please provide email and password"));
        }
      
        // check if user exists
        const user = await User.findOne({ email })
      
        if (!user || !(await user.comparePassword(password, user.password))) {
            return next(new Error("Please provide email and password"));
        }
        const token = signToken(user._id)

        res.status(201).json({
            staus: 'success',
            token
          })
    next()
}