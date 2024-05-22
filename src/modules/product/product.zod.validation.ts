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
export const ProductValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(VariantsValidationSchema),
  inventory: InventoryValidationSchema,
});

export const ProductUpdateValidationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  variants: z.array(VariantsValidationSchema).optional(),
  inventory: InventoryValidationSchema.optional(),
})

export type ProductUpdate = z.infer<typeof ProductUpdateValidationSchema>;