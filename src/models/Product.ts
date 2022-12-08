import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'

import { Category, Producer, ProductsAllInfo, Type, User } from '.'

const productSchema = new Schema(
	{
		title: {
			en: { type: String, required: true },
			ua: { type: String, required: true },
		},
		description: {
			en: { type: String, required: true },
			ua: { type: String, required: true },
		},
		price: { type: Number, required: true },
		stars: { type: Number, required: true },
		image: { type: Buffer, contentType: String, required: true },
		type: { type: [Schema.Types.ObjectId], ref: Type, required: true },
		category: { type: [Schema.Types.ObjectId], ref: Category, required: true },
		producer: { type: Schema.Types.ObjectId, ref: Producer, required: true },
		novelty: { type: Boolean, default: false, required: true },
		discount: { type: Boolean, default: false, required: true },
		discountValue: { type: Number, default: -1, required: true },
		discountPreviousPrice: { type: Number, default: -1, required: true },
		allInfo: { type: Schema.Types.ObjectId, ref: ProductsAllInfo, required: true },
		creator: { type: Schema.Types.ObjectId, ref: User, required: true },
	},
	{
		timestamps: true,
	}
)

// allFieldsRequiredByDefault(productSchema)

const Product = model('Product', productSchema)

export { Product }
