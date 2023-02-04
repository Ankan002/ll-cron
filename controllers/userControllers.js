const User = require("../models/userModel")

exports.home = (req, res) => {
    res.send("Hello World");
}

exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        //to check all details
        if (!name || !email) {
            res.status(403).send("Name and email are required fields")
        }
        //check for email
        const userexits = await User.findOne({ email });

        if (userexits) {
            res.status(403).send("USer already there")
        }
        //inserting into database
        const user = await User.create({ name, email })
        res.status(200).json({
            success: true,
            message: "User created successfully",
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}


exports.getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: "All users Data",
            users,
        });
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}

exports.editUser = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "user updated successfully",
        })

    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {

        const userId = req.params.id
        const user = await User.findByIdAndDelete(userId)
        res.status(200).json({
            success: true,
            message: "user deleted successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}