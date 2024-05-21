import { Request, Response } from "express";
import { ProductServices } from "./product.service";


const createProduct = async(req: Request, res: Response)=>{
   try{
   const{product : productData} = req.body;

    const result = await ProductServices.createProductIntoDb(productData);
    res.status(200).json({
        success: true,
        message: 'Product created successfully!',
        data: result
      });
   }catch(err){
    res.status(500).json({
        success: false,
        message: "Route not found",
        error: err
    })
   }
}

export const ProductControllers ={
    createProduct
}