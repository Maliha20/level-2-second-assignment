import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import OrderValidationSchema from "./order.zod.validation";

const createAnOrder = async(req: Request, res: Response)=>{


    try{
        const {order :orderData}= req.body;
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

export const orderController = {
    createAnOrder
}