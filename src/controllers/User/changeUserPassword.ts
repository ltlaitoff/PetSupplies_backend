import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { User } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import {
	createErrorMessage,
	createNotFoundMessage,
} from '../../helpers/messages'
import { getValidParamsWithCheckAll } from '../../helpers/getValidParams'
import { getUserInfo, getUserInfoResponse } from './helpers'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		_id: Types.ObjectId
		oldPassword: string
		newPassword: String
	}
}

const getQueryParams = (
	body: Request['body']
): ErrorMessageAnswer | getQueryParamsOk => {
	const { _id, oldPassword, newPassword } = body

	if (typeof _id !== 'string') {
		return createErrorMessage('Id must be string-ObjectId')
	}

	if (!Types.ObjectId.isValid(_id)) {
		return createErrorMessage('Id string must be ObjectId.isValid')
	}

	const resultId = new Types.ObjectId(_id)

	if (typeof oldPassword !== 'string') {
		return createErrorMessage('oldPassword must be string | undefined')
	}

	if (typeof newPassword !== 'string') {
		return createErrorMessage('newPassword must be string | undefined')
	}

	return {
		status: Status.OK,
		value: {
			_id: resultId,
			oldPassword,
			newPassword,
		},
	}
}

export const changeUserPassword = async (req: Request, res: Response) => {
	const params = getQueryParams(req.body)

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	const { _id, newPassword, oldPassword } = params.value

	const userById = await getUserInfo({ _id: _id })

	if (userById === null) {
		return res
			.status(Codes.NOT_FOUND)
			.json(createNotFoundMessage('User not found'))
	}

	console.log(userById)

	const currentUserPassword = userById.password

	console.log(currentUserPassword, oldPassword)

	if (currentUserPassword !== oldPassword) {
		return res
			.status(Codes.ERROR)
			.json(createErrorMessage('Old password is invalid'))
	}

	User.findOneAndUpdate({ _id: _id }, { password: newPassword }).then(() => {
		getUserInfoResponse({ _id: _id }, res)
	})
}
