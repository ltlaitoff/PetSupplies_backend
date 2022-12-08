import { Schema, model } from 'mongoose'

const accountLevelSchema = new Schema({
	level: { type: Number, required: true },
	description: { type: String, required: true },
})

const AccountLevel = model('AccountLevel', accountLevelSchema)

export { AccountLevel }
