import mongoose, { Schema } from 'mongoose'
import { TInventory, TProduct, TVariant } from './product.interface'

const VariantSchema = new Schema<TVariant>(
  {
    type: { type: String, required: true },
    value: { type: String, required: true }
  },
  { _id: false }
)

const InventorySchema = new Schema<TInventory>(
  {
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, required: true }
  },
  { _id: false }
)

const ProductSchema = new Schema<TProduct>({
  name: { type: String, required: [true, 'Product name is required'] },
  description: { type: String, required: [true, 'Product description is required'] },
  price: { type: Number, required: [true, 'Price is required'], min: 0 },
  category: { type: String, required: [true, 'Category is required'] },
  tags: { type: [String], required: [true, 'Tags is required'] },
  variants: { type: [VariantSchema], required: [true, 'Variants is required'] },
  inventory: { type: InventorySchema, required: [true, 'Inventory is required'] }
})

// Create the Product model
const ProductModel = mongoose.model<TProduct>('Product', ProductSchema)

export default ProductModel
