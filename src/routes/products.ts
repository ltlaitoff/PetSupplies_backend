import Router, { Request, Response } from 'express'
import { productPostController } from '../controllers/Product/ProductPost'
import { Product } from '../models'
import multer from 'multer'

const ProductRouter = Router()

const getQuery = (value: string) => {
	console.log(value)

	if (value === '' || value === undefined) return []

	const sortItems = value.split(',')
	console.log(sortItems)

	return sortItems.map(item => {
		const replacedBrackets = item.replace('(', '').replace(')', '')
		const data = replacedBrackets.split(':')

		return [data[0], data[1]]
	})
}

ProductRouter.get('/product', (req: Request, res: Response) => {
	const sort = getQuery(req.query.sort)
	console.log(sort)

	Product.find(
		{
			title: {
				en: 'titleEN',
				ua: 'titleUA',
			},
		},
		{ __v: 0, createdAt: 0, updatedAt: 0 }
	)
		.populate('type', {
			_id: 0,
			__v: 0,
		})
		.populate('category', {
			_id: 0,
			__v: 0,
		})
		.populate('producer', {
			_id: 0,
			__v: 0,
		})
		.populate('allInfo', {
			_id: 0,
			__v: 0,
		})
		.populate('creator', {
			_id: 0,
			__v: 0,
		})
		.sort(sort)
		.lean()
		.exec(function (err, result) {
			if (err) {
				res.status(500).json({ status: 'error', message: err.message })
				return
			}

			res.status(200).json(result)
		})
})

const multerStorage = multer.memoryStorage()
const upload = multer({ storage: multerStorage })

ProductRouter.post(
	'/product',
	upload.single('image'),
	async (req: Request, res: Response) => {
		// @ts-expect-error TODO
		const image = new Buffer.from(req.file.buffer, 'base64')

		const productData = await productPostController(req.query)

		console.log(productData)

		new Product({ ...productData, image: image }).save(error => {
			if (error) {
				res.status(500).json({ status: 'error', message: error.message })
				return
			}

			res.status(200).json({ status: 'ok' })
		})
	}
)

export { ProductRouter }
