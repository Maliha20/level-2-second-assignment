//creating schema validation using zod

import { z } from 'zod';

//  Zod schema for variant
const VariantsValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

//  Zod schema for inventory

const InventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

//Zod schema for product
const ProductValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(VariantsValidationSchema),
  inventory: InventoryValidationSchema,
});

export default ProductValidationSchema;
