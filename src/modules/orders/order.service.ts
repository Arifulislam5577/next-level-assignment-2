import { isValidObjectId } from 'mongoose'
import ProductModel from '../product/product.model'
import { TOrder } from './order.interface'
import OrderModel from './order.model'

export const createOrderService = async (data: TOrder) => {
  const { productId, quantity } = data

  if (!isValidObjectId(productId)) {
    return {
      success: false,
      status: 400,
      message: 'Invalid Product Id',
      data: null
    }
  }

  const product = await ProductModel.findById(productId)

  if (!product) {
    return {
      success: false,
      status: 404,
      message: 'Product not found',
      data: null
    }
  }

  // Check inStock & quantity is available in inventory
  if (!product.inventory?.inStock || product.inventory.quantity < quantity) {
    return {
      success: false,
      status: 400,
      message: 'Insufficient quantity available in inventory',
      data: null
    }
  }

  const order = await OrderModel.create(data)

  // Update quantity & inStock in inventory
  await ProductModel.findByIdAndUpdate(productId, {
    $inc: { 'inventory.quantity': -quantity },
    $set: { 'inventory.inStock': product.inventory.quantity - quantity <= 0 ? false : true }
  })

  return {
    success: true,
    status: 200,
    message: 'Order created successfully!',
    data: order
  }
}
