import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'

const accountLevelSchema = new Schema({
	level: { type: Number, required: true },
	description: { type: String, required: true },
})

allFieldsRequiredByDefault(accountLevelSchema)

const AccountLevel = model('AccountLevel', accountLevelSchema)

export { AccountLevel }
