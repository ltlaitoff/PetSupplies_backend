import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'

const typeSchema = new Schema({
	_id: Schema.Types.ObjectId,
	title: String,
	description: String,
})

allFieldsRequiredByDefault(typeSchema)

const Type = model('Type', typeSchema)

export { Type }
