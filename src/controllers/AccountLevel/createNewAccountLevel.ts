import mongoose, { Types } from 'mongoose'
import { Request, Response } from 'express'
import { AccountLevel } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import { getValidParamsWithCheckID } from '../../helpers/getValidParams'
import { checkQueryObjectIdWithUndefined } from '../../helpers/checkQuery'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId | undefined
		level: number
		description: string
	}
}

const getQueryParams = (
	body: Request['body']
): ErrorMessageAnswer | getQueryParamsOk => {
	const { _id, level, description } = body

	const resultId = checkQueryObjectIdWithUndefined(_id)

	if (resultId.status === Status.ERROR) {
		return resultId
	}

	if (typeof description !== 'string') {
		return createErrorMessage('Description must be string')
	}

	let resultLevel: number | undefined = undefined

	resultLevel = Number(level)

	if (resultLevel === undefined || resultLevel === NaN) {
		return createErrorMessage('Level must be number | undefined')
	}

	return {
		status: Status.OK,
		value: { id: resultId.value, level: resultLevel, description },
	}
}

export const createNewAccountLevel = async (req: Request, res: Response) => {
	const params = getQueryParams(req.body)

	// TODO: Add check on admin level 2

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	const newAccountLevelParams = getValidParamsWithCheckID(params.value)

	new AccountLevel(newAccountLevelParams).save((error, result) => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		return res.status(Codes.OK).json(result)
	})
}
