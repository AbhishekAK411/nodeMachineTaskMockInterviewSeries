import mongoose, {Schema} from "mongoose";

const product = new Schema({
    productName : {
        type : String,
        required : true
    },
    productPrice : {
        type: Number,
        required : true
    }
});

export default mongoose.model("Product", product);