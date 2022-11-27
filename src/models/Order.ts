import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'
import { User } from '.'

const orderSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: User },
		product: String,
		count: String,
		status: String,
	},
	{
		timestamps: true,
	}
)

allFieldsRequiredByDefault(orderSchema)

const Order = model('Order', orderSchema)

export { Order }
