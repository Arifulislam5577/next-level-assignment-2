import express, { Application, Request, Response } from 'express'
import orderRoutes from './modules/orders/order.route'
import productRoutes from './modules/product/product.route'

const app: Application = express()

app.use(express.json())
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

export default app
