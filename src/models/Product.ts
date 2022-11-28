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
		discountPreviousValue: { type: Number, default: -1 },
		allInfo: { type: Schema.Types.ObjectId, ref: ProductsAllInfo },
		creator: { type: Schema.Types.ObjectId, ref: User },
	},
	{
		timestamps: true,
	}
)

allFieldsRequiredByDefault(productSchema)

const Product = model('Product', productSchema)

export { Product }

// cardSchema.pre('save', function (next) {
// 	if (this.type !== 'Dogs' && this.type !== 'Cats') {
// 		throw new Error('Not valid card type')
// 	}

// 	if (this.price < 0) {
// 		throw new Error('Not valid card price')
// 	}

// 	if (this.stars < 0 || this.stars > 5) {
// 		throw new Error('Not valid card stars')
// 	}

// 	// TODO: Save images

// 	next()
// })
