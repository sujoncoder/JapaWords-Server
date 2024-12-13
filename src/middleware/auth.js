import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants.js";
import { EMAIL_VERIFY_TEMPLATE } from "../config/emailTemplates/emailVerifyTemplate.js";
import UserModel from "../models/user.model.js";
import transporter from "../config/nodemailer.js";


// IS LOGGEDIN MIDDLEWARE
export const isLoggedin = async (req, res, next) => {
    const token = req.cookies?.accessToken;
    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Not authorized, Login again !"
        });
    };
    try {
        // decoded token
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, Login again !"
            })
        };

        req.user = decoded
        next()

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    };
};


// IS_ADMIN MIDDLEWARE
export const isAdmin = async (req, res, next) => {
    const { id } = req.user;
    try {
        const user = await UserModel.findById(id)
        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Forbidden.You must be an admin to access this resource!"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};