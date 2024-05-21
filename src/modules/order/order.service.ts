import { Torder } from "./order.interface";
import { OrderModel } from "./order.model";


const createAnOrderIntoDb = async(order:Torder)=>{
    
    const result = OrderModel.create(order)
    return result




}


export const OrderServices ={
    createAnOrderIntoDb
}