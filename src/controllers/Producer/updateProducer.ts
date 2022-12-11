import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Producer } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import { getValidParamsWithCheckAll } from '../../helpers/getValidParams'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId
		title: string | undefined
		description: string | undefined
		website: string | undefined
	}
}

const getQueryParams = (
	req: Request
): ErrorMessageAnswer | getQueryParamsOk => {
	const { id, title, description, website } = req.query

	if (typeof id !== 'string') {
		return createErrorMessage('Id must be undefined | string')
	}

	if (!Types.ObjectId.isValid(id)) {
		return createErrorMessage('Id string must be ObjectId.isValid')
	}

	const resultId = new Types.ObjectId(id)

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

	if (website !== undefined) {
		if (typeof website !== 'string') {
			return createErrorMessage('Website must be string')
		}
	}

	return {
		status: Status.OK,
		value: { id: resultId, title, description, website },
	}
}

export const updateProducer = async (req: Request, res: Response) => {
	const params = getQueryParams(req)

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	// TODO: Add check on admin level 2

	const { id, title, description, website } = params.value

	const updatedParams = getValidParamsWithCheckAll({
		id,
		title,
		description,
		website,
	})

	Producer.updateOne({ _id: id }, updatedParams, null, error => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		Producer.findOne({ _id: id }).exec((findError, findResult) => {
			if (findError) {
				return res
					.status(Codes.ERROR)
					.json(createErrorMessage('Something went wrong.' + findError.name))
			}

			return res.status(Codes.OK).json(findResult)
		})
	})
}
