import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  avatar: string
  password: string
}

export interface IUserObject extends Document {
  _id: string
  name: string
  email: string
  password: string
  email_confirmed: boolean
  status: boolean
  deleted: boolean
  createdAt: string
  updatedAt: string
}

const UserSchema: Schema = new Schema({
  name: String,
  email: String,
  avatar: String,
  password: String,
  email_confirmed: Boolean,
  status: Boolean,
  deleted: Boolean
}, { timestamps: true })

export default mongoose.model<IUser>('User', UserSchema)
