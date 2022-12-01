import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'

import { Category, Producer, ProductsAllInfo, Type, User } from '.'

const productSchema = new Schema(
	{
		title: {
			en: String,
			ua: String,
		},
		description: {
			en: String,
			ua: String,
		},
		price: Number,
		stars: Number,
		image: { type: Buffer, contentType: String },
		type: { type: [Schema.Types.ObjectId], ref: Type },
		category: { type: [Schema.Types.ObjectId], ref: Category },
		producer: { type: Schema.Types.ObjectId, ref: Producer },
		novelty: { type: Boolean, default: false },
		discount: { type: Boolean, default: false },
		discountValue: { type: Number, default: -1 },
		discountPreviousPrice: { type: Number, default: -1 },
		allInfo: { type: Schema.Types.ObjectId, ref: ProductsAllInfo },
		creator: { type: Schema.Types.ObjectId, ref: User },
	},
	{
		timestamps: true,
	}
)

// allFieldsRequiredByDefault(productSchema)

const Product = model('Product', productSchema)

export { Product }
