import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'
import { User } from '.'
import { Product } from './Product'

const orderSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: User },
		product: { type: Schema.Types.ObjectId, ref: Product },
		count: String,
		productPrice: Number,
		address: String,
		status: String,
	},
	{
		timestamps: true,
	}
)

// allFieldsRequiredByDefault(orderSchema)

const Order = model('Order', orderSchema)

export { Order }
