import mongoose, { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Type } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import { getValidParamsWithCheckID } from '../../helpers/getValidParams'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId | undefined
		title: string
		description: string
	}
}

const getQueryParams = (
	body: Request['body']
): ErrorMessageAnswer | getQueryParamsOk => {
	const { _id, title, description } = body

	let resultId: undefined | Types.ObjectId = undefined

	if (_id !== undefined) {
		if (typeof _id !== 'string') {
			return createErrorMessage('Id must be undefined | string')
		}

		if (!Types.ObjectId.isValid(_id)) {
			return createErrorMessage('Id string must be ObjectId isValid')
		}

		resultId = new Types.ObjectId(_id)
	}

	if (typeof title !== 'string') {
		return createErrorMessage('Title must be string')
	}

	if (typeof description !== 'string') {
		return createErrorMessage('Description must be string')
	}
	return {
		status: Status.OK,
		value: { id: resultId, title, description },
	}
}

export const createNewType = async (req: Request, res: Response) => {
	const params = getQueryParams(req.body)

	// TODO: Add check on admin level 2

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	const { id, title, description } = params.value

	const newCategoryParams = getValidParamsWithCheckID({
		id,
		title,
		description,
	})

	new Type(newCategoryParams).save((error, result) => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		return res.status(Codes.OK).json(result)
	})
}
