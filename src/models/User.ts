import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'
import { AccountLevel } from './AccountLevel'

const userSchema = new Schema(
	{
		surname: String,
		name: String,
		email: String,
		phone: String,
		password: String,
		country: String,
		city: String,
		zipCode: Number,
		address: String,
		accountAdminLevel: { type: Schema.Types.ObjectId, ref: AccountLevel },
	},
	{
		timestamps: true,
	}
)

allFieldsRequiredByDefault(userSchema)

const User = model('User', userSchema)

export { User }
