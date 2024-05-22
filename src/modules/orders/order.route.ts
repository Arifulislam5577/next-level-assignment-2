import express from 'express'
import { validateData } from '../../middleware/validationMiddleware'
import { orderController } from './order.controller'
import { orderValidationSchema } from './order.validationSchema'

const router = express.Router()

router.route('/').post(validateData(orderValidationSchema), orderController.createOrder)

export default router
