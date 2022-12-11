import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Order } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import { getValidParamsWithCheckAll } from '../../helpers/getValidParams'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId | undefined
		user: Types.ObjectId | undefined
		product: Types.ObjectId | undefined
		count: number | undefined
		productPrice: number | undefined
		address: string | undefined
		status: string | undefined
	}
}

const getQueryParams = (
	req: Request
): ErrorMessageAnswer | getQueryParamsOk => {
	const { id, user, product, count, productPrice, address, status } = req.query

	let resultId: undefined | Types.ObjectId = undefined
	let resultUser: undefined | Types.ObjectId = undefined
	let resultProduct: undefined | Types.ObjectId = undefined

	if (id !== undefined) {
		if (typeof id !== 'string') {
			return createErrorMessage('Id must be undefined | string')
		}

		if (!Types.ObjectId.isValid(id)) {
			return createErrorMessage('Id string must be ObjectId.isValid')
		}

		resultId = new Types.ObjectId(id)
	}

	if (user !== undefined) {
		if (typeof user !== 'string') {
			return createErrorMessage('user must be undefined | string')
		}

		if (!Types.ObjectId.isValid(user)) {
			return createErrorMessage('user string must be ObjectId.isValid')
		}

		resultUser = new Types.ObjectId(user)
	}

	if (product !== undefined) {
		if (typeof product !== 'string') {
			return createErrorMessage('product must be undefined | string')
		}

		if (!Types.ObjectId.isValid(product)) {
			return createErrorMessage('product string must be ObjectId.isValid')
		}

		resultProduct = new Types.ObjectId(product)
	}

	let resultCount: undefined | number = undefined
	let resultProductPrice: undefined | number = undefined

	if (count !== undefined) {
		if (Number(count) === NaN) {
			return createErrorMessage('address must be string')
		}

		resultCount = Number(count)
	}

	if (productPrice !== undefined) {
		if (Number(productPrice) === NaN) {
			return createErrorMessage('address must be string')
		}

		resultProductPrice = Number(productPrice)
	}

	if (address !== undefined) {
		if (typeof address !== 'string') {
			return createErrorMessage('address must be string')
		}
	}

	if (status !== undefined) {
		if (typeof status !== 'string') {
			return createErrorMessage('status must be string')
		}
	}

	return {
		status: Status.OK,
		value: {
			id: resultId,
			user: resultUser,
			product: resultProduct,
			count: resultCount,
			productPrice: resultProductPrice,
			address,
			status,
		},
	}
}

export const getOrder = async (req: Request, res: Response) => {
	const params = getQueryParams(req)

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	const findParams = getValidParamsWithCheckAll(params.value)

	Order.find(findParams, { __v: 0 }).exec((error, result) => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		return res.status(Codes.OK).json(result)
	})
}
