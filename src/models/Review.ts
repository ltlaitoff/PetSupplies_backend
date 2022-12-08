import { Schema, model } from 'mongoose'
import { User } from './User'

const rewiewsSchema = new Schema(
	{
		author: { type: Schema.Types.ObjectId, ref: User },
		comment: { type: String, required: true },
		pluses: { type: String, required: true },
		minuses: { type: String, required: true },
		rating: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
)

const Review = model('Review', rewiewsSchema)

export { Review }
