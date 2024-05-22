import { Request, Response } from 'express'
import { CreateOrderData, GetOrdersData } from './order.interface'
import { createOrderService, getOrdersService } from './order.service'

// METHOD : POST
// ROUTE : /api/orders
const createOrder = async (req: Request, res: Response) => {
  const result: CreateOrderData = await createOrderService(req.body)

  return res.status(result.status).json({
    success: result.success,
    message: result.message,
    data: result.data
  })
}

// METHOD : GET
// ROUTE : /api/orders

const getOrders = async (req: Request, res: Response) => {
  const { email } = req.query

  const result: GetOrdersData = await getOrdersService(email as string)

  return res.status(result.status).json({
    success: result.success,
    message: result.message,
    data: result.data
  })
}

export const orderController = {
  createOrder,
  getOrders
}
