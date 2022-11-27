import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'

const categorySchema = new Schema({
	title: String,
	description: String,
})

allFieldsRequiredByDefault(categorySchema)

const Category = model('Category', categorySchema)

export { Category }
