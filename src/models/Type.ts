import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'

const typeSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
})

allFieldsRequiredByDefault(typeSchema)

const Type = model('Type', typeSchema)

export { Type }
