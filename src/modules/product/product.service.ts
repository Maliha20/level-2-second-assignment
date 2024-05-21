import { Request, Response } from "express";
import { ProductModel } from "./product.model";
import { TProduct } from "./product.interface";

const createProductIntoDb = async(product: TProduct )=>{
   const result = await ProductModel.create(product) 
   return result
}

export const ProductServices ={
    createProductIntoDb
}