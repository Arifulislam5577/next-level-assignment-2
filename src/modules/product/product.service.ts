import { TGetProductsData } from './product.interface'
import ProductModel from './product.model'

export const getProductsService = async (searchTerm?: string): Promise<TGetProductsData> => {
  try {
    let query = {}
    if (searchTerm) {
      query = {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } }
        ]
      }
    }

    const products = await ProductModel.find(query)

    const message = searchTerm
      ? `Products matching search term "${searchTerm}" fetched successfully!`
      : 'Products fetched successfully!'

    return {
      success: true,
      status: 200,
      message,
      data: products
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
