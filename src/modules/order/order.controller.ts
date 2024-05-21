import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import OrderValidationSchema from "./order.zod.validation";

const createAnOrder = async(req: Request, res: Response)=>{


    try{
        const {order : orderData}= req.body;
        const zodOrderParsedData = OrderValidationSchema.parse(orderData)

       
    const result = await OrderServices.createAnOrderIntoDb(zodOrderParsedData)
    res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: result
    })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: err,
        })
    }
}

const getAllOrders =async(req: Request, res: Response)=>{
    try{
        const {email} = req.query
      const result = await OrderServices.getAllOrdersFromDb(email as string)
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully',
        data: result,
    })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Order not found",
            error: err,
        })
    }
}

export const orderController = {
    createAnOrder,
    getAllOrders
}