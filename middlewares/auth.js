import Token from "../models/token.schema.js";
import User from "../models/user.schema.js";
import bcrypt from "bcrypt";

export const checkRegister = async(req,res,next) =>{
    try {
        const  {username, email, password, confirmPassword, role, pin, number} = req.body;
        if(!username) return res.send("Username is required.");
        if(!email) return res.send("email is required.");
        if(!password) return res.send("password is required.");
        if(!confirmPassword) return res.send("Confirm your password.");
        if(!role) return res.send("role is required.");
        if(!pin) return res.send("pin is required.");
        if(!number) return res.send("number is required.");

        if(password.length < 8 || confirmPassword.length < 8){
            return res.send("Passwords should be more than 8 characters.");
        }
        if(password !== confirmPassword){
            return req.send("Passwords do not match.");
        }
        next();
    } catch (error) {
        return res.send(error);
    }
}

export const checkLogin = async(req,res,next) =>{
    try {
        const {email, password} = req.body;
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.");

        const findUser = await User.findOne({email}).exec();
        if(!findUser) return res.send("User not found.");
        const checkPass = await bcrypt.compare(password, findUser.password);
        if(checkPass){
            next();
        }else{
            return res.send("Incorrect credentials.");
        }
    } catch (error) {
        return res.send(error);
    }
}

export const checkAddProductRole = async(req,res,next) =>{
    try {
        const {token, email, password, pin, productName, productPrice} = req.body;
        if(!token) return res.send("Please generate a token by visiting /getToken.");
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("password is required.");
        if(!pin) return res.send("pin is required.");
        if(!productName) return res.send("Product name is required.");
        if(!productPrice) return res.send("Product price is required.");

        const user = await User.findOne({email}).exec();
        if(!user) return res.send("User not found.");
        const checkPass =await bcrypt.compare(password, user.password)
        const checkPin =await bcrypt.compare(pin, user.pin);

        if(!checkPass || !checkPin){
            return res.send("Incorrect credentials.");
        }

        const getToken = await Token.findOne({}).exec();
        if(token !== getToken.token){
            return res.send("Please regenerate another token.");
        }
        
        if(user.role == "buyer"){
            return res.send("You are not designated to access this link. Please get verified.");
        }
        next();
    } catch (error) {
        return res.send(error);
    }
}

export const checkGetProductRole = async(req,res,next) =>{
    try {
        const {email, password, pin, token} = req.body;
        if(!token) return res.send("Please generate a token by visiting /getToken.");
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("password is required.");
        if(!pin) return res.send("pin is required.");

        const getUser = await User.findOne({email}).exec();
        if(!getUser) return res.send("user not found.");

        if(getUser.role == "seller"){
            return res.send("Please register through a buyer account to access these links.");
        }

        const getToken = await Token.findOne({}).exec();
        if(token !== getToken.token){
            return res.send("Please regerate another token.");
        }

        const checkPass =await bcrypt.compare(password, getUser.password);
        const checkPin =await bcrypt.compare(pin, getUser.pin);

        if(!checkPass || !checkPin){
            return res.send("Incorrect credentials.");
        }
        next();
    } catch (error) {
        return res.send(error);
    }
}

export const checkDeleteProductRole = async(req,res,next) =>{
    try {
        const {token, email, password, pin, productId} = req.body;
        if(!token) return res.send("Please generate a token by visiting /getToken.");
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("password is required.");
        if(!pin) return res.send("pin is required.");
        if(!productId) return res.send("Id of the product is required.");

        const getUser = await User.findOne({email}).exec();
        const checkPass = await bcrypt.compare(password, getUser.password);
        const checkPin = await bcrypt.compare(pin, getUser.pin);

        if(!checkPass || !checkPin){
            return res.send("Incorrect credentials.");
        }
        const getToken = await Token.findOne({}).exec();
        if(token !== getToken.token){
            return res.send("please regenerate another token.");
        }
        if(getUser.role == "seller" || getUser.role == "buyer"){
            return res.send("You are not designated to access this link.");
        }
        next();
    } catch (error) {
        return res.send(error);
    }
}