import { Schema, model } from 'mongoose'

interface CardType {
	id: number
	title: string
}

const cardSchema = new Schema<CardType>({
	id: { type: Number, required: true },
	title: { type: String, required: true },
})

const Card = model<CardType>('Card', cardSchema)

export { Card }
