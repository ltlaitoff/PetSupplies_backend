import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Review } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import { getValidParamsWithCheckAll } from '../../helpers/getValidParams'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId | undefined
		author: Types.ObjectId | undefined
		pluses: string | undefined
		comment: string | undefined
		minuses: string | undefined
		rating: number | undefined
	}
}

const getQueryParams = (
	req: Request
): ErrorMessageAnswer | getQueryParamsOk => {
	const { id, author, comment, pluses, minuses, rating } = req.query

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

	let resultAuthor: undefined | Types.ObjectId = undefined

	if (author !== undefined) {
		if (typeof author !== 'string') {
			return createErrorMessage('Author must be undefined | string')
		}

		if (!Types.ObjectId.isValid(author)) {
			return createErrorMessage('Author string must be ObjectId.isValid')
		}

		resultAuthor = new Types.ObjectId(author)
	}

	if (comment !== undefined) {
		if (typeof comment !== 'string') {
			return createErrorMessage('Comment must be string')
		}
	}

	if (pluses !== undefined) {
		if (typeof pluses !== 'string') {
			return createErrorMessage('Pluses must be string')
		}
	}

	if (minuses !== undefined) {
		if (typeof minuses !== 'string') {
			return createErrorMessage('Minuses must be string')
		}
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

export const getReview = async (req: Request, res: Response) => {
	const params = getQueryParams(req)

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	const findParams = getValidParamsWithCheckAll(params.value)

	Review.findOne(findParams, { __v: 0 }).exec((error, result) => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		return res.status(Codes.OK).json(result)
	})
}
