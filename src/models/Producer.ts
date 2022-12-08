import { Schema, model } from 'mongoose'
import { allFieldsRequiredByDefault } from '../helpers/allFieldRequiredByDefault'

const producerSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		website: { type: String, required: true },
	},
	{
		timestamps: true,
	}
)

allFieldsRequiredByDefault(producerSchema)

const Producer = model('Producer', producerSchema)

export { Producer }
