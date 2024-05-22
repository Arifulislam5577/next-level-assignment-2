import { Request, Response } from 'express'
import OrderModel from './order.model'
import { createOrderService } from './order.service'

// METHOD : POST
// ROUTE : /api/orders
const createOrder = async (req: Request, res: Response) => {
  const result = await createOrderService(req.body)

  return res.status(result.status).json({
    success: result.success,
    message: result.message,
    data: result.data
  })
}

// METHOD : GET
// ROUTE : /api/orders

const getOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query

    let query = {}
    if (email) {
      query = {
        $or: [{ email: { $regex: email, $options: 'i' } }]
      }
    }

    const orders = await OrderModel.find(query)

    let message = ''

    if (!email && orders?.length) {
      message = 'Orders fetched successfully!'
    } else if (email && orders?.length) {
      message = `Orders fetched successfully for user email!`
    } else {
      message = 'Order not found'
    }
    // Order not found Orders fetched successfully!
    return res.status(200).json({
      success: true,
      message,
      data: orders
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      data: null
    })
  }
}

export const orderController = {
  createOrder,
  getOrders
}
