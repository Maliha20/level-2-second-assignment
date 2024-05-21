import { Request, Response } from 'express';
import { ProductModel } from './product.model';
import { TProduct } from './product.interface';
import { ProductControllers } from './product.controller';

// create a product into the database
const createProductIntoDb = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};
//get all products from the database

const getAllProductsFromDb = async () => {
  const result = await ProductModel.find();
  return result;
};
const getAProductFromDb = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  return result;
};

const updateAProductInDb = async (_id: string, updatedProduct: any) => {
    
  const result = await ProductModel.updateOne({ _id },{
    $set: updatedProduct
  },{new: true})
  console.log(updatedProduct);
   return result;
};
export const ProductServices = {
  createProductIntoDb,
  getAllProductsFromDb,
  getAProductFromDb,
  updateAProductInDb
};
