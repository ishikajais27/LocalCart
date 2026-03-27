import mongoose, { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'vendor'], required: true },
  stallId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
})

export const User = models.User || model('User', UserSchema)
