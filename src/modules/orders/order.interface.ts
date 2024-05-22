export interface TOrder {
  email: string
  productId: string
  price: number
  quantity: number
}

export interface GetOrdersData {
  success: boolean
  status: number
  message: string
  data: Array<TOrder> | null
}

export interface CreateOrderData {
  success: boolean
  status: number
  message: string
  data: TOrder | null
}
