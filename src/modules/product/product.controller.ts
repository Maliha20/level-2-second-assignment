import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { z } from "zod";
import ProductValidationSchema from "./product.zod.validation";


//create a product
const createProduct = async(req: Request, res: Response)=>{
  

    
   try{
   const{product : productData} = req.body;

     const zodParsedData = ProductValidationSchema.parse(productData)
    const result = await ProductServices.createProductIntoDb(zodParsedData);
   
   
    res.status(200).json({
        success: true,
        message: 'Product created successfully!',
        data: result
      });
   }catch(err){
    res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err
    })
   }
}

//get all products
const getAllProducts = async(req: Request, res :Response)=>{
    try{
        const result = await ProductServices.getAllProductsFromDb()
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result
          });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Products not found",
            error: err
        })
    }
}

const getAProduct = async(req: Request, res: Response)=>{
try{   

 const {productId} = req.params
const result =await ProductServices.getAProductFromDb(productId)
res.status(200).json({
    success: true,
    message: 'Product fetched successfully!',
    data: result
})}catch(err){
    res.status(500).json({
        success: false,
        message: "Products not found",
        error: err
    })
}
}

const updateAProduct = async(req: Request, res: Response)=>{
   try{
    const {productId} = req.params
    const updatedProduct = req.body
    const result =await ProductServices.updateAProductInDb(productId,updatedProduct)
    res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: result })

   }catch(err){
    res.status(500).json({
        success: false,
        message: "something went wrong",
        error: err
    })
}
}
export const ProductControllers ={
    createProduct,
    getAllProducts,
    getAProduct,
    updateAProduct
}