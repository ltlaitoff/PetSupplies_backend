import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'
import { User } from './User'

const rewiewsSchema = new Schema(
	{
		author: { type: Schema.Types.ObjectId, ref: User },
		pluses: String,
		minuses: String,
		rating: Number,
	},
	{
		timestamps: true,
	}
)

allFieldsRequiredByDefault(rewiewsSchema)

const Review = model('Review', rewiewsSchema)

export { Review }
