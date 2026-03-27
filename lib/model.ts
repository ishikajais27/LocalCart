import mongoose from 'mongoose'

// Category model
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
})
export const Category =
  mongoose.models.Category || mongoose.model('Category', categorySchema)

// Artisan model
const artisanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    craft: { type: String, required: true },
    location: { type: String, required: true },
    story: { type: String },
    image: { type: String },
    verified: { type: Boolean, default: false },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps: true },
)
export const Artisan =
  mongoose.models.Artisan || mongoose.model('Artisan', artisanSchema)

// PreOrder model
const preOrderSchema = new mongoose.Schema(
  {
    specs: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    status: { type: String, default: 'pending' },
    artisanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artisan',
      required: true,
    },
  },
  { timestamps: true },
)
export const PreOrder =
  mongoose.models.PreOrder || mongoose.model('PreOrder', preOrderSchema)
