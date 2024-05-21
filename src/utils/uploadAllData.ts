import dotenv from 'dotenv'
import mongoose from 'mongoose'
import config from '../config'
import { productsData } from '../data/product'
import ProductModel from '../modules/product/product.model'
dotenv.config()

const seedProducts = async () => {
  mongoose.set('strictQuery', true)
  await mongoose.connect(config.DATABASE_URL!)
  try {
    await ProductModel.deleteMany()
    console.log('Product deleted')
    await ProductModel.insertMany(productsData)
    console.log('Product added')
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

seedProducts()
