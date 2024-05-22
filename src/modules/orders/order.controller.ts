import { Request, Response } from 'express'
import { TCreateOrderData, TGetOrdersData } from './order.interface'
import { createOrderService, getOrdersService } from './order.service'

// METHOD : POST
// ROUTE : /api/orders
const createOrder = async (req: Request, res: Response) => {
  const result: TCreateOrderData = await createOrderService(req.body)

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

  const result: TGetOrdersData = await getOrdersService(email as string)

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
