import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'

const categorySchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
})

allFieldsRequiredByDefault(categorySchema)

const Category = model('Category', categorySchema)

export { Category }
