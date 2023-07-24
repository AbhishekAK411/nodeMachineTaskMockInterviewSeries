import express from "express";
import { checkAddProductRole, checkDeleteProductRole, checkGetProductRole, checkLogin, checkRegister } from "../middlewares/auth.js";
import { login, register } from "../controllers/user.cont.js";
import { CronJob } from "cron";
import Token from "../models/token.schema.js";
import { getToken } from "../controllers/token.cont.js";
import { addProduct, deleteProduct, getProduct } from "../controllers/prod.cont.js";


let job = new CronJob("0 */4 * * *", async () =>{
    let character = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcedfghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let charLength = character.length;
    let genToken = "";

    for(let i=0;i<=100;i++){
        genToken += character.charAt(Math.floor(Math.random() * charLength));
    };

    const ExistToken = await Token.findOne({}).exec();
    if(ExistToken){
        ExistToken.token = genToken;
        await ExistToken.save();
    }else{
        const newToken = new Token({
            token : genToken
        });
        await newToken.save();
    }
});

job.start();


const router = express.Router();

router.post("/register", checkRegister, register);
router.post("/login", checkLogin, login);
router.get("/getToken", getToken);
router.post("/addProduct", checkAddProductRole, addProduct);
router.post("/getProduct", checkGetProductRole, getProduct);
router.post("/deleteProduct", checkDeleteProductRole, deleteProduct);
export default router;