import Product from "../models/product.schema.js";

export const addProduct = async(req,res) =>{
    try {
        const {productName, productPrice} = req.body;

        const newProduct = new Product({
            productName,
            productPrice
        });
        await newProduct.save();
        return res.send("Product added successfully.");
    } catch (error) {
        return res.send(error);
    }
}

export const getProduct = async(req,res) =>{
    try {
        const getProduct = await Product.find({}).exec();
        return res.send(getProduct);
    } catch (error) {
        return res.send(error);
    }
}

export const deleteProduct = async(req,res) =>{
    try {
        const {productId} = req.body;
        const response = await Product.findByIdAndDelete({_id : productId}).exec();
        if(response){
            return res.send("Deleted Product successfully.");
        }
    } catch (error) {
        return res.send(error);
    }
}