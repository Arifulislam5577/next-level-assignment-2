import express from 'express'
import { validateData } from '../../middleware/validationMiddleware'
import { productController } from './product.controller'
import { productValidationSchema } from './product.validationSchema'

const ProductRoute = express.Router()

ProductRoute.route('/').post(validateData(productValidationSchema), productController.createProduct)

export { ProductRoute }
