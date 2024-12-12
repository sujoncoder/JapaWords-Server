import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";
import transporter from "../config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE } from "../config/emailTemplates/emailVerifyTemplate.js";
import { JWT_SECRET } from "../config/constants.js";


// USER REGISTER CONTROLLER
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required !"
        });
    };

    try {
        // check user exist or not
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exist !" })
        };

        // password hashed
        const hashedPassword = await bcrypt.hash(password, 10);

        // generate 6 dixit OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        // OTP expire at
        const otpExpireAt = Date.now() + 5 * 60 * 1000;

        // create new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            verifyOtp: otp,
            verifyOtpExpireAt: otpExpireAt
        });
        await newUser.save();

        // prepare mail
        const mailOptions = {
            to: email,
            subject: "Account Verification email",
            html: EMAIL_VERIFY_TEMPLATE.replace("{{name}}", name).replace("{{otp}}", otp)
        };
        await transporter.sendMail(mailOptions);

        // generata a token
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "10m" });

        // set the token in a cookie
        res.cookie("verification_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            samesite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 10 * 60 * 1000
        });

        // sent to the success response
        return res.status(201).json({
            success: true,
            message: "We,ve sent an OTP to your mail. Please verify your account within 5 minutes."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};


// ACCOUNT VERIFY OTP
export const accountVerifyOtp = async (req, res) => {
    const { otp } = req.body;
    const token = req.cookies.verification_token;

    if (!otp) {
        return res.status(400).json({
            success: false,
            message: "Otp is required !"
        });
    };

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Verification token not found !"
        });
    };

    try {
        // decoded token
        const decode = jwt.verify(token, JWT_SECRET);

        // extract email from decoded token
        const email = decode.email;

        // find the user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found !"
            });
        };

        // check user OTP has expired
        if (Date.now() > user.verifyOtpExpireAt) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired !"
            });
        };

        // math mail OTP with user OTP
        if (user.verifyOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP !"
            });
        };

        // after OTP verified
        user.isAccountVerified = true
        user.verifyOtp = ""
        user.verifyOtpExpireAt = 0

        await user.save();

        // clear he verifiation token cookie
        res.clearCookie("verification_token");

        return res.status(200).json({
            success: true,
            message: "Your account has been successfully verified."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

};