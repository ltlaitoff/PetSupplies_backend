import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'
import { AccountLevel } from './AccountLevel'

const userSchema = new Schema(
	{
		surname: { type: String, required: true },
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		password: { type: String, required: true },
		country: { type: String, required: true },
		city: { type: String, required: true },
		zipCode: { type: Number, required: true },
		address: { type: String, required: true },
		accountAdminLevel: { type: Schema.Types.ObjectId, ref: AccountLevel, required: true },
	},
	{
		timestamps: true,
	}
)

allFieldsRequiredByDefault(userSchema)

const User = model('User', userSchema)

export { User }
