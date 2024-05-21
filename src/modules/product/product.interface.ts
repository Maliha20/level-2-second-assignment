
export type TVariants={
    type: string;
    value: string
}
export type TInventory={
     quantity: number;
     stock: number
}
export type TProduct = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    variants: TVariants[];
    inventory: TInventory

  }
  