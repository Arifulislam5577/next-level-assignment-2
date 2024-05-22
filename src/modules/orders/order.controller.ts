import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import ProductModel from '../product/product.model'
import OrderModel from './order.model'

// METHOD : POST
// ROUTE : /api/orders
const createOrder = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body

  if (!isValidObjectId(productId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Product Id',
      data: null
    })
  }

  try {
    const product = await ProductModel.findById(productId)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        data: null
      })
    }

    if (!product.inventory?.inStock || product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
        data: null
      })
    }

    const order = await OrderModel.create(req.body)
    await ProductModel.findByIdAndUpdate(productId, {
      $inc: { 'inventory.quantity': -quantity },
      $set: { 'inventory.inStock': product.inventory.quantity - quantity <= 0 ? false : true }
    })

    return res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: order
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error,
      data: null
    })
  }
}

export const orderController = {
  createOrder
}
