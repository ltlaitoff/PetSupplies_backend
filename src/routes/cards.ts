import e from 'express'
import Router, { Request, Response } from 'express'
import { Card } from '../models'
import multer from 'multer'

const CardsRouter = Router()

CardsRouter.get('/cards', (req: Request, res: Response) => {
	const query = req.query

	const objectForFind: any = {}

	if (query.title) objectForFind.title = { $eq: query.title }
	if (query.description) objectForFind.description = { $eq: query.description }
	if (query.type) objectForFind.type = { $eq: query.type }
	if (query.price) objectForFind.price = { $eq: query.price }
	if (query.stars) objectForFind.stars = { $eq: query.stars }
	if (query.image) objectForFind.image = { $eq: query.image }
	if (query.category) objectForFind.category = { $eq: query.category }
	if (query.producer) objectForFind.producer = { $eq: query.producer }
	if (query.novelty) objectForFind.new = { $eq: query.new }
	if (query.discount) objectForFind.discount = { $eq: query.discount }
	if (query.discountValue)
		objectForFind.discountValue = { $eq: query.discountValue }

	Card.find(objectForFind, {
		creator: 0,
		createdAt: 0,
		updatedAt: 0,
		__v: 0,
	}).then(result => {
		res.status(200).json(result)
	})
})

const multerStorage = multer.memoryStorage()
const upload = multer({ storage: multerStorage })

CardsRouter.post(
	'/cards',
	upload.single('image'),
	async (req: Request, res: Response) => {
		const {
			title,
			description,
			type,
			price,
			stars,
			category,
			producer,
			novelty,
			discount,
			discountValue,
			creator,
		} = req.query

		// @ts-expect-error TODO
		const image = new Buffer.from(req.file.buffer, 'base64')

		const card = new Card({
			title,
			description,
			type,
			price,
			stars,
			image,
			category,
			producer,
			novelty,
			discount,
			discountValue,
			creator: creator === undefined ? 'query' : creator,
		})

		card.save(err => {
			if (err) {
				return res.status(400).json({ status: 'error', error: err.message })
			}

			return res.status(200).json({ status: 'ok' })
		})
	}
)

CardsRouter.delete('/cards', (req: Request, res: Response) => {
	const key = req.query.key

	if (key === 'REMOVE_ALL_ITEMS') {
		Card.remove({}, err => {
			if (err) {
				res
					.status(500)
					.json({ status: 'failed server', message: 'Server error: ' + err })
				return
			}

			res
				.status(200)
				.json({ status: 'ok', message: 'All items in Card has been removed' })
			return
		})

		return
	}

	res.status(400).json({ status: 'failed', message: 'Invalid Key query' })
})

export { CardsRouter }
