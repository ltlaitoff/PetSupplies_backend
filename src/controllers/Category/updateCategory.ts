import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Category, User } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import { getValidParamsWithCheckAll } from '../../helpers/getValidParams'
import { getUserAdminLevelByAuthorizaionHeader } from '../helpers/getUserAdminLevel'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId
		title: string | undefined
		description: string | undefined
	}
}

const getQueryParams = (
	req: Request
): ErrorMessageAnswer | getQueryParamsOk => {
	const { id, title, description } = req.query

	if (typeof id !== 'string') {
		return createErrorMessage('Id must be string')
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

	return {
		status: Status.OK,
		value: { id: resultId, title, description },
	}
}

export const updateCategory = async (req: Request, res: Response) => {
	const params = getQueryParams(req)

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	// START CHECK ON ADMIN
	const ADMIN_LEVEL = 2

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

	const { id, title, description } = params.value

	const updatedParams = getValidParamsWithCheckAll({ id, title, description })

	Category.updateOne({ _id: id }, updatedParams, null, (error, result) => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		Category.findOne({ _id: id }).exec((findError, findResult) => {
			if (findError) {
				return res
					.status(Codes.ERROR)
					.json(createErrorMessage('Something went wrong.' + findError.name))
			}

			return res.status(Codes.OK).json(findResult)
		})
	})
}
