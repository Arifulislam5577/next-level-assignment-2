import { Request, Response } from 'express'
import ProductModel from './product.model'

const createProduct = async (req: Request, res: Response) => {
  const productData = req.body
  try {
    const createdProduct = await ProductModel.create(productData)

    return res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: createdProduct
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error
    })
  }
}

export const productController = {
  createProduct
}
