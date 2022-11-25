const expressAsyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require('../models/UserModel')

//@desc Register User
//@route POST https://event-tracker-api.onrender.com/api/v1/auth/register-user
//@access Public
const registerUser = expressAsyncHandler( async (req, res) => {

    const {fullname, email, password} = req.body

    // check if fields are filled 
    if(!fullname || !email || !password){
        res.status(400).json({message: "Please fill out All fileds"})
    }

    // check if user email already in database 
    const userExit = await User.findOne({email})
    if(userExit){
        res.status(400)
        throw new Error("email already registered") 
    }

    const hashPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
        fullname,
        email,
        password: hashPassword
    })
    
    if(user) {res.status(201).json({ 
        fullname: user.fullname,
        email: user.email,
        _id: user.id
    })}

    if(!user){
        res.status(400)
        throw new Error("Wrong Input")
    }
})


//@desc Login User
//@route POST https://event-tracker-api.onrender.com/api/v1/auth/login-user
//@access Public
const loginUser = expressAsyncHandler( async (req, res) => {
    const {email, password} = req.body

    // check for email in database 
    const user = await User.findOne({email})
    // console.log(userEmail)
    const validPassword = await bcrypt.compare(password, user.password)

    const accessToken = jwt.sign({fullname: user.fullname, email: user.email, _id:user.id}, process.env.JWT_SECRET, {expiresIn: '40d'})


    // await user.save()
    
        res.status(201).json({
            name: user.fullname,
            email: user.email,
            _id: user.id,
            accessToken
        })
        
    // } else{
        res.status(400)
        throw new Error("wrong credentials")
    // }
})

//@desc Get single User me
//@route POST https://event-tracker-api.onrender.com/api/get-me/:userId
//@access private
const getMe = expressAsyncHandler( async (req, res) => {
    // const {_id, name, email } = await User.findById(req.body.id)
    // res.status(200).json("display private data")
         res.status(200).json(req.user)

})

// const generateToken = (id) => {
//     return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
// }

module.exports = {registerUser, loginUser, getMe} 
