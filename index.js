import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/userRoutes.js";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use("/api/mock", router);
dotenv.config();


mongoose.connect(process.env.MONGO)
.then(() => console.log("DB Connection Established."))
.catch((err) => console.log("DB Error", err));

app.listen(process.env.PORT, () => console.log(`working on port ${process.env.PORT}`))