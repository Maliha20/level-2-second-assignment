import { Torder } from "./order.interface";
import { OrderModel } from "./order.model";

//creating order data
const createAnOrderIntoDb = async(order:Torder)=>{
    
    const result = OrderModel.create(order)
    return result
}
// get all orders from db and search orders by email

const getAllOrdersFromDb = async(email?: string)=>{
    const emailQuery = email ? { email: new RegExp(email, 'i')} :{}
    const result = await OrderModel.find(emailQuery)
    return result
}


export const OrderServices ={
    createAnOrderIntoDb,
    getAllOrdersFromDb
}