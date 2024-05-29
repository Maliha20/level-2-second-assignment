import { ProductModel } from '../product/product.model';
import { Torder } from './order.interface';
import { OrderModel } from './order.model';

//creating order data
const createAnOrderIntoDb = async (order: Torder) => {
  try {
    const product = await ProductModel.findById(order.productId);
    if (!product) {
      throw new Error('Product doesnt exist');
    }
    if (product.inventory.quantity < order.quantity) {
      throw new Error('Insufficient quantity available in inventory');
    }

    // updating the inventory
    product.inventory.quantity -= order.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await ProductModel.updateOne(
      { _id: order.productId },
      { $set: product },
      { new: true },
    );
    const result = OrderModel.create(order);
    return result;
  } catch (err: unknown) {
    const error = err as Error;
    throw new Error(error.message);
  }
};
// get all orders from db and search orders by email

const getAllOrdersFromDb = async (email?: string) => {
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Invalid email address');
  }

  const emailQuery = email ? { email: new RegExp(email, 'i') } : {};

  const result = await OrderModel.find(emailQuery);
  return result;
};

export const OrderServices = {
  createAnOrderIntoDb,
  getAllOrdersFromDb,
};
