import express, { Application, Request, Response } from 'express'
import orderRoutes from './modules/orders/order.route'
import productRoutes from './modules/product/product.route'

const app: Application = express()

app.use(express.json())
app.get('/', (req: Request, res: Response) => {
  res.json('Hello World!')
})

app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

export default app
