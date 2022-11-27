import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'
import { Review } from '.'

const productsAllInfoSchema = new Schema(
	{
		description: String,
		characteristics: String,
		reviews: { type: Schema.Types.ObjectId, ref: Review },
	},
	{
		timestamps: true,
	}
)

allFieldsRequiredByDefault(productsAllInfoSchema)

const ProductsAllInfo = model('ProductsAllInfo', productsAllInfoSchema)

export { ProductsAllInfo }
