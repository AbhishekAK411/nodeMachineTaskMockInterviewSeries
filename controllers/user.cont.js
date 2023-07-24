import User from "../models/user.schema.js";
import bcrypt from "bcrypt";

export const register = async(req,res) =>{
    try {
        const {username, email, password, role, pin, number} = req.body;

        const userExist = await User.findOne({email}).exec();
        if(userExist) return res.send("User is already registered.");

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPass = await bcrypt.hash(password, salt);
        const hashPin = await bcrypt.hash(pin, salt);

        const newUser = new User({
            username,
            email,
            password: hashPass,
            role,
            pin : hashPin,
            number
        });
        await newUser.save();
        return res.send("Registration successful.");
    } catch (error) {
        return res.send(error);
    }
}

export const login = async(req,res) =>{
    try {
        return res.send("Login successful.");
    } catch (error) {
        return res.send(error);
    }
}