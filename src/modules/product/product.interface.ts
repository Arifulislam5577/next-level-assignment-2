export type TVariant = {
  type: string
  value: string
}

export interface TInventory {
  quantity: number
  inStock: boolean
}

export interface TProduct {
  name: string
  description: string
  price: number
  category: string
  tags: string[]
  variants: TVariant[]
  inventory: TInventory
}

export interface TGetProductsData {
  success: boolean
  status: number
  message: string
  data: Array<TProduct> | null
}
