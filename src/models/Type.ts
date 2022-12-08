import { Schema, model } from 'mongoose'

const typeSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
})

const Type = model('Type', typeSchema)

export { Type }
