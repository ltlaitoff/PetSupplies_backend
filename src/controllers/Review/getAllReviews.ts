import { Request, Response } from 'express'
import { Review } from '../../models'
import { Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'

export const getAllReviews = (req: Request, res: Response) => {
	Review.find({}, { __v: 0 }).exec((error, result) => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		return res.status(Codes.OK).json(result)
	})
}
