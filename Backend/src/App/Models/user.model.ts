import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
}

export interface IUserObject extends Document {
  _id: string
  name: string
  email: string
  password: string
}

const UserSchema: Schema = new Schema({
  name: String,
  email: String,
  password: String
})

export default mongoose.model<IUser>('User', UserSchema)
