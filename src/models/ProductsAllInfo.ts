import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'
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

allFieldsRequiredByDefault(productsAllInfoSchema)

const ProductsAllInfo = model('ProductsAllInfo', productsAllInfoSchema)

export { ProductsAllInfo }
