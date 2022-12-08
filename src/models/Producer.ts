import { Schema, model } from 'mongoose'

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

const Producer = model('Producer', producerSchema)

export { Producer }
