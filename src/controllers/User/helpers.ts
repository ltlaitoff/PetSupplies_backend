import {
	createErrorMessage,
	createNotFoundMessage,
} from '../../helpers/messages'
import { User } from '../../models'
import { Codes } from '../../types'
import { Response } from 'express'

export const getUserInfo = async (params: any) => {
	return await User.findOne(params, { __v: 0 }).populate('accountAdminLevel', {
		__v: 0,
	})
}

export const getUserInfoResponse = async (params: any, res: Response) => {
	User.findOne(params, { __v: 0, password: 0, phone: 0 })
		.populate('accountAdminLevel', { __v: 0 })
		.exec((error, result) => {
			if (error) {
				return res
					.status(Codes.ERROR)
					.json(createErrorMessage('Something went wrong.' + error.name))
			}

			if (result === null) {
				return res
					.status(Codes.NOT_FOUND)
					.json(createNotFoundMessage('User not found'))
			}

			return res.status(Codes.OK).json(result)
		})
}
