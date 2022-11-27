import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'

const accountLevelSchema = new Schema({
	level: Number,
	description: String,
})

allFieldsRequiredByDefault(accountLevelSchema)

const AccountLevel = model('AccountLevel', accountLevelSchema)

export { AccountLevel }
