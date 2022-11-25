import Router, { Request, Response } from 'express'
import { Card } from '../models'

const CardsRouter = Router()

CardsRouter.get('/cards', (req: Request, res: Response) => {
	const query = req.query

	const objectForFind = {
		id: {},
		title: {},
	}

	if (query.id) objectForFind.id = { $eq: query.id }
	if (query.title) objectForFind.title = { $eq: query.title }

	Card.find(objectForFind, { _id: 0, __v: 0 }).then(result => {
		res.status(200).json(result)
	})
})

CardsRouter.post('/cards', (req: Request, res: Response) => {
	const { id, title } = req.query

	const card = new Card({
		id,
		title,
	})

	card.save(err => {
		if (err) {
			return res.status(400).json({ status: 'error', error: err.message })
		}

		return res.status(200).json({ status: 'ok' })
	})
})

export { CardsRouter }
