import { ProductModel } from './product.model';
import { TProduct } from './product.interface';


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
const getAProductFromDb = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  return result;
};

const updateAProductInDb = async (_id: string, updatedProduct: any) => {
  const result = await ProductModel.updateOne(
    { _id },
    {
      $set: updatedProduct,
    },
    { new: true },
  );
  console.log(updatedProduct);
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
