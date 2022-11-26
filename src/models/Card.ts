import { Schema, model } from 'mongoose'

interface CardType {
	title: string
	description: string
	type: 'Cats' | 'Dogs'
	price: number
	stars: number
	image: Buffer
	category: string
	producer: string
	novelty?: boolean
	discount?: boolean
	discountValue?: number
	creator: string
}

const cardSchema = new Schema<CardType>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		type: { type: String, required: true },
		price: { type: Number, required: true },
		stars: { type: Number, required: true },
		image: { type: Buffer, required: true, contentType: String },
		category: { type: String, required: true },
		producer: { type: String, required: true },
		novelty: { type: Boolean, required: true, default: false },
		discount: { type: Boolean, required: true, default: false },
		discountValue: { type: Number, required: true, default: 0 },
		creator: { type: String, required: true, default: '-' },
	},
	{
		timestamps: true,
	}
)

cardSchema.pre('save', function (next) {
	if (this.type !== 'Dogs' && this.type !== 'Cats') {
		throw new Error('Not valid card type')
	}

	if (this.price < 0) {
		throw new Error('Not valid card price')
	}

	if (this.stars < 0 || this.stars > 5) {
		throw new Error('Not valid card stars')
	}

	// TODO: Save images

	next()
})

const Card = model<CardType>('Card', cardSchema)

export { Card }
