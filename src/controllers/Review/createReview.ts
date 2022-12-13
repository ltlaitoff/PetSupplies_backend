import mongoose, { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Review } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import { getValidParamsWithCheckID } from '../../helpers/getValidParams'
import { getUserAdminLevelByAuthorizaionHeader } from '../helpers/getUserAdminLevel'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId
		author: Types.ObjectId
		pluses: string
		comment: string
		minuses: string
		rating: number | undefined
	}
}

const getQueryParams = (
	body: Request['body']
): ErrorMessageAnswer | getQueryParamsOk => {
	const { id, author, comment, pluses, minuses, rating } = body

	if (typeof id !== 'string') {
		return createErrorMessage('Id must be undefined | string')
	}

	if (!Types.ObjectId.isValid(id)) {
		return createErrorMessage('Id string must be ObjectId.isValid')
	}

	const resultId = new Types.ObjectId(id)

	if (typeof author !== 'string') {
		return createErrorMessage('Author must be undefined | string')
	}

	if (!Types.ObjectId.isValid(author)) {
		return createErrorMessage('Author string must be ObjectId.isValid')
	}

	const resultAuthor = new Types.ObjectId(author)

	if (typeof comment !== 'string') {
		return createErrorMessage('Comment must be string')
	}

	if (typeof pluses !== 'string') {
		return createErrorMessage('Pluses must be string')
	}

	if (typeof minuses !== 'string') {
		return createErrorMessage('Minuses must be string')
	}

	let resultRating: number | undefined = undefined

	if (rating !== undefined) {
		if (Number(rating) === NaN) {
			return createErrorMessage('Level must be number | undefined')
		}

		resultRating = Number(rating)
	}

	return {
		status: Status.OK,
		value: {
			id: resultId,
			author: resultAuthor,
			comment,
			pluses,
			minuses,
			rating: resultRating,
		},
	}
}

export const createNewReview = async (req: Request, res: Response) => {
	const params = getQueryParams(req.body)

	// START CHECK ON ADMIN
	const ADMIN_LEVEL = 1

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

	// TODO: Add check user exists

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	const newReviewParams = getValidParamsWithCheckID(params.value)

	new Review(newReviewParams).save((error, result) => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		return res.status(Codes.OK).json(result)
	})
}
