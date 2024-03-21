const Product = require('../Models/productModel');
const mongoose = require('mongoose');

// -------------- all products controllers are working properly this should be available for admin users only-----------

// get all products
const getAllProducts = async (req, res) =>{
   try {
    const products = await Product.find({});
    res.status(200).json(products);
   } catch (error) {
     res.status(400).json({message: error.message});
   }
}

// create a new product
const createProduct = async (req, res) => {
    try {
        const resultProduct = await Product.create({...req.body});
        res.json({
            message: 'Product created Successfully',
            resultProduct,
            status:200
        });
    } catch (error) {
        console.log("Error: " , error)
        res.json({status:400, message:error.message});
    }
}

// get product by id
const getProductById = async (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(200).json({error:"No Such Product"});
        }
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(500).json({message: 'Product not found'});
        }
        res.status(200).json({product});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// update product by id
const updateProductById = async(req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({error:"No such product"});
        }

        const product = await Product.findOneAndUpdate({_id:req.params.id},{...req.body},{ new: true });

        if(!product){
            return res.status(400).json({error:"No such product"});
        }

        res.status(200).json({message:"Product Updated Successfully",product});
    } catch (error) {
        res.status(400).json({error: error.message});   
    }
}

// delete product by id
const deleteProductById = async (req,res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(200).json({error:"No Such Product"});
        }

        const product = await Product.findOneAndDelete({_id:req.params.id});
        
        if(!product){
            return res.status(500).json({error: 'Product not found'});
        }
        res.status(200).json({message:'Product deleted successfully'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


module.exports = {createProduct,getAllProducts,getProductById,deleteProductById,updateProductById}