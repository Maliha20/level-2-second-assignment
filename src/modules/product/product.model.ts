import {Schema, model } from "mongoose";
import { TInventory, TProduct, TVariants } from "./product.interface";


const VariantsSchema = new Schema<TVariants>({
    type: {type:String,
        required: true
    },
    value: {type:String,
        required: true}
})
const InventorySchema = new Schema<TInventory>({
    quantity: {type : Number,
        required: true},
    stock:  {type : Number,
        required: true}
})
const ProductSchema = new Schema<TProduct>({
    id: {
        type: String,
        required: true,
        unique: true,
      },
    name: {type : String,
        required: true},
    description:  {type : String,
        required: true},
    price: {type : Number,
        required: true},
    category:  {type : String,
        required: true},
    tags:[{type: String,
        required: true}],
    variants: { type : [VariantsSchema],
        required: true},
    inventory: {type: InventorySchema,
        required: true}
})

export const ProductModel = model<TProduct>('Product', ProductSchema)