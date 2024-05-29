import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import OrderValidationSchema from "./order.zod.validation";
import { ProductModel } from "../product/product.model";
import { Error } from "mongoose";

const createAnOrder = async(req: Request, res: Response)=>{
     
    try{
        const order= req.body;
       
         const product = await ProductModel.findById(order.productId)
        if(!product){
           throw new Error('Invalid Product Id')
        }
    const zodOrderParsedData = OrderValidationSchema.parse(order)
    const result = await OrderServices.createAnOrderIntoDb(zodOrderParsedData)
    res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: result
    })
    }
    catch(err: unknown){
        const error = err as Error
        res.status(500).json({
            success: false,
            message:error.message || 'something went wrong',
            error: err,
        })
    }
}

const getAllOrders =async(req: Request, res: Response)=>{
    try {
        const  {email} = req.query;
    
        if (email) 
          {
          const result = await OrderServices.getAllOrdersFromDb(email as string);
          res.status(200).json({ 
            success: true,
            message: result.length > 0 ? 'Orders fetched successfully for user email!' : 'Order not found',
            data: result
          });
        } 
        else{
          const result = await OrderServices.getAllOrdersFromDb();
          res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: result,
          })
        }
      } catch (err) {
        res.status(500).json({
          success: false,
          message: 'Order not found',
          error: err,
        });
      }
}

export const orderController = {
    createAnOrder,
    getAllOrders
}