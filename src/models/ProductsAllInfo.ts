import { Schema, model } from 'mongoose'
import { Review } from '.'

const productsAllInfoSchema = new Schema(
	{
		description: { type: String, required: true },
		characteristics: { type: String, required: true },
		reviews: { type: [Schema.Types.ObjectId], ref: Review },
	},
	{
		timestamps: true,
	}
)

const ProductsAllInfo = model('ProductsAllInfo', productsAllInfoSchema)

export { ProductsAllInfo }
