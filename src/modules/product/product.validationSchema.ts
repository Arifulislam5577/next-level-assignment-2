import { z } from 'zod'

const variantSchema = z.object({
  type: z.string({ message: 'Variant type is required' }),
  value: z.string({ message: 'Variant value is required' })
})

const inventorySchema = z.object(
  {
    quantity: z.number({ message: 'Quantity is Number type' }).positive({ message: 'Quantity can not be negative' }),
    inStock: z.boolean({ message: 'InStock is required' })
  },
  { message: 'Inventory Info is required' }
)

const productValidationSchema = z.object({
  name: z.string({ message: 'Product name is required' }),
  description: z.string({ message: 'Product description is required' }),
  price: z.number().positive({ message: 'Price can not be negative' }),
  category: z.string({ message: 'Category is required' }),
  tags: z.array(z.string(), { message: 'Product Tags is required' }),
  variants: z.array(variantSchema, { message: 'Variants is required' }),
  inventory: inventorySchema
})

export { productValidationSchema }
