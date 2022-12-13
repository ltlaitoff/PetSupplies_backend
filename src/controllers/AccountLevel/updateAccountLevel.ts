import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { AccountLevel } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import { getValidParamsWithCheckAll } from '../../helpers/getValidParams'
import { getUserAdminLevelByAuthorizaionHeader } from '../helpers/getUserAdminLevel'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId
		level: number | undefined
		description: string | undefined
	}
}

const getQueryParams = (
	req: Request
): ErrorMessageAnswer | getQueryParamsOk => {
	const { id, level, description } = req.query

	if (typeof id !== 'string') {
		return createErrorMessage('Id must be undefined | string')
	}

	if (!Types.ObjectId.isValid(id)) {
		return createErrorMessage('Id string must be ObjectId.isValid')
	}

	const resultId = new Types.ObjectId(id)

	if (description !== undefined) {
		if (typeof description !== 'string') {
			return createErrorMessage('Description must be string')
		}
	}

	let resultLevel: number | undefined = undefined

	if (level !== undefined) {
		if (Number(level) === NaN) {
			return createErrorMessage('Level must be number | undefined')
		}

		resultLevel = Number(level)
	}

	return {
		status: Status.OK,
		value: { id: resultId, level: resultLevel, description },
	}
}

export const updateAccountLevel = async (req: Request, res: Response) => {
	const params = getQueryParams(req)

	// START CHECK ON ADMIN
	const ADMIN_LEVEL = 3

	const adminLevel = await getUserAdminLevelByAuthorizaionHeader(
		req.headers.authorization
	)

	if (adminLevel.status === Codes.ERROR) {
		return res.status(Codes.UNAUTHORIZED).json(adminLevel.message)
	}

	if (adminLevel.value < ADMIN_LEVEL) {
		return res
			.status(Codes.NOT_FOUND)
			.json(createErrorMessage(`User admin level must be equal ${ADMIN_LEVEL}`))
	}

	// END CHECK ON ADMIN

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	const { id, level, description } = params.value

	const updatedParams = getValidParamsWithCheckAll({
		id,
		level,
		description,
	})

	AccountLevel.updateOne({ _id: id }, updatedParams, null, error => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		AccountLevel.findOne({ _id: id }).exec((findError, findResult) => {
			if (findError) {
				return res
					.status(Codes.ERROR)
					.json(createErrorMessage('Something went wrong.' + findError.name))
			}

			return res.status(Codes.OK).json(findResult)
		})
	})
}
