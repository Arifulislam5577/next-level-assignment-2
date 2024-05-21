import express from 'express'
import { validateData } from '../../middleware/validationMiddleware'
import { productController } from './product.controller'
import { productValidationSchema } from './product.validationSchema'

const router = express.Router()

router
  .route('/')
  .get(productController.getProducts)
  .post(validateData(productValidationSchema), productController.createProduct)

router
  .route('/:productId')
  .get(productController.getProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct)

export default router
