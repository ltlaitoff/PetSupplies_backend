import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'

const producerSchema = new Schema(
	{
		title: String,
		description: String,
		website: String,
	},
	{
		timestamps: true,
	}
)

allFieldsRequiredByDefault(producerSchema)

const Producer = model('Producer', producerSchema)

export { Producer }
