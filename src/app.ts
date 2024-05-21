import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import config from './config'
import productRoutes from './modules/product/product.route'

const app: Application = express()

if (config.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('tiny'))
}

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/api/products', productRoutes)

export default app
