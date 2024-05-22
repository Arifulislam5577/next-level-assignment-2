import mongoose, { Schema } from 'mongoose'
import { TOrder } from './order.interface'

const OrderSchema = new Schema<TOrder>({
  email: { type: String, required: [true, 'Email is required'] },
  productId: { type: String, required: [true, 'Product id is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] }
})

const OrderModel = mongoose.model<TOrder>('Order', OrderSchema)

export default OrderModel
