const userModel = require('../models/userModel');

const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {})
}

const loginController = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});


        if(!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).send('user not found');
        }
        const token = signToken(user._id);

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensures secure transmission in production
            sameSite: "lax",
        });

        res.status(200).send({
            success: true,
            user,
        });

    }catch(error){
        res.status(400).send({
            success: false,
            error
        })
    }
}

const registerController = async (req, res) => {
    try{
        console.log(req.body);
        const newUser = new userModel(req.body)
        console.log(newUser)
        await newUser.save();
        const token = signToken(newUser._id);
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensures secure transmission in production
            sameSite: "lax",
        });
        res.status(201).json({
            success: true,
            user: newUser
        });

    }catch(error){
        res.status(400).send({
            success: false,
            error
        })
    }
}

const logoutController = async (req, res) => {
    try{
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/"
        });
        res.json({ message: "Logged out successfully" });
    }catch(error){
        res.status(400).send({
            success: false,
            error
        })
    }
}




module.exports = {loginController, registerController, logoutController};