import { isValidObjectId } from 'mongoose'
import ProductModel from '../product/product.model'
import { TCreateOrderData, TGetOrdersData, TOrder } from './order.interface'
import OrderModel from './order.model'

// CREATE ORDER
export const createOrderService = async (data: TOrder): Promise<TCreateOrderData> => {
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

// GET ORDERS
export const getOrdersService = async (email?: string): Promise<TGetOrdersData> => {
  try {
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

    return {
      success: orders?.length ? true : false,
      status: orders?.length ? 200 : 404,
      message,
      data: orders
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      status: 500,
      message: 'Internal server error',
      data: null
    }
  }
}
