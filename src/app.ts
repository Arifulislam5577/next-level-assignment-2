import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import { ProductRoute } from './modules/product/product.route'

const app: Application = express()

app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/api/products', ProductRoute)

export default app
