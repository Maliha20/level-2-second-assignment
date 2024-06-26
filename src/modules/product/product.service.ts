import { ProductModel } from './product.model';
import { TProduct } from './product.interface';
import { ProductUpdate } from './product.zod.validation';


// create a product into the database
const createProductIntoDb = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};
//get all products from the database

const getAllProductsFromDb = async (searchTerm?: string) => {
  const productQuery = searchTerm
    ? {
        $or: [
          { name: new RegExp(searchTerm, 'i') },
          { description: new RegExp(searchTerm, 'i') },
          { category: new RegExp(searchTerm, 'i') },
        ],
      }
    : {};

  const result = await ProductModel.find(productQuery);
  return result;
};

//get a single product from the database

const getAProductFromDb = async (_id: string) => {

  const doesProductExist = await ProductModel.findOne({_id :_id})

  if(!doesProductExist){
    throw new Error('Product not found!')
  }
  const result = await ProductModel.findOne({ _id });
  return result;
};

//update a specific product in the database

const updateAProductInDb = async (_id: string, updatedProduct: ProductUpdate) => {

  // const doesProductExist = await ProductModel.findOne({_id :_id})
  // if(!doesProductExist){
  //   throw new Error('Product not found!')
  // }
  const result = await ProductModel.updateOne(
    { _id },
    {
      $set: updatedProduct,
    },
    { new: true },
  );

  return result;
};

//delete a product from database

const deleteProductFromDb = async (_id: string) => {
  const result = await ProductModel.deleteOne({ _id });
  return result;
};

export const ProductServices = {
  createProductIntoDb,
  getAllProductsFromDb,
  getAProductFromDb,
  updateAProductInDb,
  deleteProductFromDb,
};
