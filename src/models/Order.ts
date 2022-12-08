import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'
import { User } from '.'
import { Product } from './Product'

const orderSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: User, required: true },
		product: { type: Schema.Types.ObjectId, ref: Product, required: true },
		count: { type: Number, required: true },
		productPrice: { type: Number, required: true },
		address: { type: String, required: true },
		status: { type: String, required: true },
	},
	{
		timestamps: true,
	}
)

// allFieldsRequiredByDefault(orderSchema)

const Order = model('Order', orderSchema)

export { Order }
