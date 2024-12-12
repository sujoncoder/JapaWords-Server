import UserModel from "../models/user.model.js";


// GET ALL USER
export const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.find({ role: "user" });
        return res.status(200).json({
            success: true,
            total: users.length,
            users: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};


// GET SINGLE USER
export const getSingleUser = async (req, res) => {
    try {
        const id = req.params.id;
        const options = { password: 0 };
        const user = await UserModel.findById(id, options);
        if (!user) {
            return res.status(404).json({
                success: true,
                message: "User not found !"
            });
        };

        return res.status(200).json({
            success: true,
            user: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};