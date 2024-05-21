import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariants } from './product.interface';


const VariantsSchema = new Schema<TVariants>(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);
const InventorySchema = new Schema<TInventory>(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, default: true, required: true },
  },
  { _id: false },
);
const ProductSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [{ type: String, required: true }],
  variants: { type: [VariantsSchema], required: true },
  inventory: { type: InventorySchema, required: true },
});

export const ProductModel = model<TProduct>('Product', ProductSchema);
