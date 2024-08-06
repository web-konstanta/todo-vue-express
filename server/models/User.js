import { model, Schema } from 'mongoose'

const User = new Schema({
    name: { type: String, required: true },
    email: { type: String, unicode: true, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    activationLink: { type: String }
})

export default model('User', User)