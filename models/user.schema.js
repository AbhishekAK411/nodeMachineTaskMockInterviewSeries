import mongoose, {Schema} from "mongoose";

const user = new Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }, 
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    pin : {
        type : String,
        required : true
    },
    number : {
        type : Number,
        required : true
    }
});

export default mongoose.model("User", user);