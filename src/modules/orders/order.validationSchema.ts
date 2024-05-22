import { z } from 'zod'

const orderValidationSchema = z.object({
  email: z.string({ message: 'Email is required' }).email({ message: 'Email must be a valid email address' }),
  productId: z.string({ message: 'Product ID is required' }),
  price: z.number({ message: 'Price is required' }).positive({ message: 'Price must be a positive number' }),
  quantity: z.number({ message: 'Quantity is required' }).positive({ message: 'Quantity must be a positive number' })
})

export { orderValidationSchema }
