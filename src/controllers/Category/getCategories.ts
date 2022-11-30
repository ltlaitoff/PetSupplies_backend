import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Category, User } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import { getValidParamsWithCheckAll } from '../../helpers/getValidParams'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId | undefined
		title: string | undefined
		description: string | undefined
	}
}

const getQueryParams = (
	req: Request
): ErrorMessageAnswer | getQueryParamsOk => {
	const { id, title, description } = req.query

	let resultId: undefined | Types.ObjectId = undefined

	if (id !== undefined) {
		if (typeof id !== 'string') {
			return createErrorMessage('Id must be undefined | string')
		}

		if (!Types.ObjectId.isValid(id)) {
			return createErrorMessage('Id string must be ObjectId.isValid')
		}

		resultId = new Types.ObjectId(id)
	}

	if (title !== undefined) {
		if (typeof title !== 'string') {
			return createErrorMessage('Title must be string')
		}
	}

	if (description !== undefined) {
		if (typeof description !== 'string') {
			return createErrorMessage('Description must be string')
		}
	}

	return {
		status: Status.OK,
		value: { id: resultId, title, description },
	}
}

export const getCategories = async (req: Request, res: Response) => {
	const params = getQueryParams(req)

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	const { id, title, description } = params.value

	const findParams = getValidParamsWithCheckAll({ id, title, description })

	Category.find(findParams, { __v: 0 }).exec((error, result) => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		return res.status(Codes.OK).json(result)
	})
}
