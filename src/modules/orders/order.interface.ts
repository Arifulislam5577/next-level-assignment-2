export interface TOrder {
  email: string
  productId: string
  price: number
  quantity: number
}

export interface TGetOrdersData {
  success: boolean
  status: number
  message: string
  data: Array<TOrder> | null
}

export interface TCreateOrderData {
  success: boolean
  status: number
  message: string
  data: TOrder | null
}
