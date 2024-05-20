import {Schema } from "mongoose";


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