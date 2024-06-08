
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import users from "../models/auth.js"
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

const test = process.env.JWT_SECRET;



export const signup=async(req,res)=>{
const {name,email,password}=req.body;
try{
    const existingUser = await users.findOne({email})
    if(existingUser){
        return res.status(404).json({messege:'User alreadfy exist'})
    }
    const hashPassword=await bcrypt.hash(password,12)
    const newUser = await users.create({name,email,password:hashPassword})
    const token = jwt.sign({email:newUser.email,id:newUser._id},test,{expiresIn:'1hr'})
    res.status(200).json({result:newUser,token})
}catch(error){
    res.status(500).json("something went wrong...")

}
}
export const login=async(req,res)=>{
const {email,password}=req.body;
try{
    const existingUser = await users.findOne({email})
    if(!existingUser){
        return res.status(404).json({messege:'User not exist'})
    }
    const isPasswordCrt =await bcrypt.compare(password,existingUser.password)
    if(!isPasswordCrt){
        return res.status(400).json({messege:"Invalid Credentials"})
    }
    const token = jwt.sign({email:existingUser.email,id:existingUser._id},test,{expiresIn:'1hr'})
    res.status(200).json({result:existingUser,token})

}catch (error){
    res.status(500).json("Something Went Wrong...")
}
}
export const forgetPassword = async (req, res) => {
    try {
        const user = await users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const token = jwt.sign({ userId: user._id }, test, { expiresIn: "10m" });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
               
            },
        });

        const mailOptions = {
            from: "avanish121299@gmail.com",
            to: req.body.email,
            subject: "Reset Password",
            html: `<h1>Reset Your Password</h1>
                   <p>Click on the following link to reset your password:</p>
                   <a href="https://666432dfb7dd97baaf16fcd5--remarkable-hummingbird-d0a4ee.netlify.app//reset-password/${token}">Reset Password</a>
                   <p>The link will expire in 10 minutes.</p>
                   <p>If you didn't request a password reset, please ignore this email.</p>`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).send({ message: err.message });
            }
            res.status(200).send({ message: "Email sent" });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
export const resetPassword = async (req, res) => {
    try {
        const decodedToken = jwt.verify(req.params.token, test);

        if (!decodedToken) {
            return res.status(401).send({ message: "Invalid token" });
        }

        const user = await users.findOne({ _id: decodedToken.userId });
        if (!user) {
            return res.status(401).send({ message: "No user found" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).send({ message: "Password updated" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};




