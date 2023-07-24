import Token from "../models/token.schema.js";

export const getToken = async(req,res) =>{
    try{
        const token = await Token.findOne({}).exec();
        return res.send(token.token);
    }catch(err){
        return res.send(err);
    }
}