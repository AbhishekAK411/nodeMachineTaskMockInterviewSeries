import mongoose, {Schema} from "mongoose";

const token = new Schema({
    token : {
        type : String,
        required : true,
        unique : true
    }
});

export default mongoose.model("Token", token);