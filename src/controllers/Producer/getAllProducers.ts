import { Request, Response } from 'express'
import { Producer } from '../../models'
import { Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'

export const getAllProducers = (req: Request, res: Response) => {
	Producer.find({}, { __v: 0 }).exec((error, result) => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		return res.status(Codes.OK).json(result)
	})
}
