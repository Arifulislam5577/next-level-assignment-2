import { Request, Response } from 'express'
import { TGetProductsData } from './product.interface'
import ProductModel from './product.model'
import { getProductsService } from './product.service'

// METHOD : POST
// ROUTE : /api/products

const createProduct = async (req: Request, res: Response) => {
  try {
    const createdProduct = await ProductModel.create(req.body)

    return res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: createdProduct
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      data: null
    })
  }
}

// METHOD : GET
// ROUTE : /api/products

const getProducts = async (req: Request, res: Response) => {
  const { searchTerm } = req.query

  const result: TGetProductsData = await getProductsService(searchTerm as string)

  return res.status(result.status).json({
    success: result.success,
    message: result.message,
    data: result.data
  })
}

// METHOD : GET
// ROUTE : /api/products/:productId

const getProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const product = await ProductModel.findById(productId)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found!',
        data: null
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: product
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      data: null
    })
  }
}

// METHOD : PUT
// ROUTE : /api/products/:productId

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params

    const product = await ProductModel.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true
    })

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        data: null
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: product
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      data: null
    })
  }
}

// METHOD : DELETE
// ROUTE : /api/products/:productId

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params

    const product = await ProductModel.findByIdAndDelete(productId)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        data: null
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      data: null
    })
  }
}

export const productController = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
}
