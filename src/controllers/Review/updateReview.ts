import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Review } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import { getValidParamsWithCheckAll } from '../../helpers/getValidParams'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId
		pluses: string | undefined
		comment: string | undefined
		minuses: string | undefined
		rating: number | undefined
	}
}

const getQueryParams = (
	req: Request
): ErrorMessageAnswer | getQueryParamsOk => {
	const { id, comment, pluses, minuses, rating } = req.query

	if (typeof id !== 'string') {
		return createErrorMessage('Id must be undefined | string')
	}

	if (!Types.ObjectId.isValid(id)) {
		return createErrorMessage('Id string must be ObjectId.isValid')
	}

	const resultId = new Types.ObjectId(id)

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
			comment,
			pluses,
			minuses,
			rating: resultRating,
		},
	}
}

export const updateReview = async (req: Request, res: Response) => {
	const params = getQueryParams(req)

	// TODO: Add check on admin level 2

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	const { id } = params.value

	const updatedParams = getValidParamsWithCheckAll(params.value)

	Review.updateOne({ _id: id }, updatedParams, null, error => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		Review.findOne({ _id: id }).exec((findError, findResult) => {
			if (findError) {
				return res
					.status(Codes.ERROR)
					.json(createErrorMessage('Something went wrong.' + findError.name))
			}

			return res.status(Codes.OK).json(findResult)
		})
	})
}
