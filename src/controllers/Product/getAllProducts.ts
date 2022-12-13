import { Request, Response } from 'express'
import { Product } from '../../models'
import { Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'

export const getAllProducts = (req: Request, res: Response) => {
	Product.find({}, { __v: 0 })
		.populate('type', { __v: 0 })
		.populate('category', { __v: 0 })
		.populate('producer', { __v: 0 })
		.populate('allInfo', { __v: 0 })
		.populate('creator', { __v: 0, phone: 0, password: 0 })
		.exec((error, result) => {
			if (error) {
				return res
					.status(Codes.ERROR)
					.json(createErrorMessage('Something went wrong.' + error.name))
			}

			return res.status(Codes.OK).json(result)
		})
}
