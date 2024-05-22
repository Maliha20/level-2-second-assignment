import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { ProductUpdateValidationSchema, ProductValidationSchema } from './product.zod.validation';
import { ProductModel } from './product.model';
import { Error } from 'mongoose';

//create a product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
  
    const zodParsedData = ProductValidationSchema.parse(productData)
    const result = await ProductServices.createProductIntoDb(zodParsedData);
    
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

//get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm} = req.query;

    //putting condtions for searching a product based on the field name - name, description and category
    if (searchTerm) 
      {
      const result = await ProductServices.getAllProductsFromDb(searchTerm as string);
      res.status(200).json({
        success: true,
        message: `Products matching searchTerm ' ${searchTerm} ' fetched successfully!`,
        data: result,
      });
    } 
    else{
      const result = await ProductServices.getAllProductsFromDb();
      res.status(200).json({
        success: true,
        message: "Products matching category fetched successfully!",
        data: result,
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Products not found',
      error: err,
    });
  }
};

//get a single product from the  database

const getAProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getAProductFromDb(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Products not found',
      error: err,
    });
  }
};


// update an existing product in the database

const updateAProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedProduct = req.body;
    const zodUpdateData = ProductUpdateValidationSchema.parse(updatedProduct)
    
     const result = await ProductServices.updateAProductInDb(
      productId,
      zodUpdateData,
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

//delete a product from the database
const deleteAproduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductServices.deleteProductFromDb(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getAProduct,
  updateAProduct,
  deleteAproduct,
};
