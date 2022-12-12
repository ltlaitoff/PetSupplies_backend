import { Request, Response } from 'express'
import { User } from '../../models'
import { Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'

export const getAllUsers = (req: Request, res: Response) => {
	User.find({}, { __v: 0, password: 0, phone: 0 })
		.populate('accountAdminLevel', { __v: 0 })
		.exec((error, result) => {
			if (error) {
				return res
					.status(Codes.ERROR)
					.json(createErrorMessage('Something went wrong.' + error.name))
			}

			return res.status(Codes.OK).json(result)
		})
}
