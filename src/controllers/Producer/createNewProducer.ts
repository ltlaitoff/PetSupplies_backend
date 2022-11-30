import mongoose, { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Producer } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import { getValidParamsWithCheckID } from '../../helpers/getValidParams'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId | undefined
		title: string
		description: string
		website: string
	}
}

const getQueryParams = (
	body: Request['body']
): ErrorMessageAnswer | getQueryParamsOk => {
	const { _id, title, description, website } = body

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

	if (typeof website !== 'string') {
		return createErrorMessage('Website must be string')
	}

	return {
		status: Status.OK,
		value: { id: resultId, title, description, website },
	}
}

export const createNewProducer = async (req: Request, res: Response) => {
	const params = getQueryParams(req.body)

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	const { id, title, description, website } = params.value

	const newProducerParams = getValidParamsWithCheckID({
		id,
		title,
		description,
		website,
	})

	new Producer(newProducerParams).save((error, result) => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		return res.status(Codes.OK).json(result)
	})
}
