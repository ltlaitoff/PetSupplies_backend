import mongoose, { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Order, Product, User } from '../../models'
import {
	Status,
	SuccessMessageAnswer,
	ErrorMessageAnswer,
	Codes,
} from '../../types'
import {
	createErrorMessage,
	createSuccessMessage,
} from '../../helpers/messages'
import { getValidParamsWithCheckID } from '../../helpers/getValidParams'
import { getUserAdminLevelByAuthorizaionHeader } from '../helpers/getUserAdminLevel'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId | undefined
		user: Types.ObjectId
		product: Types.ObjectId
		count: number
		productPrice: number | undefined
		address: string | undefined
		status: string | undefined
	}
}

const getQueryParams = (
	body: Request['body']
): ErrorMessageAnswer | getQueryParamsOk => {
	const { id, user, product, count, productPrice, address, status } = body

	let resultId: undefined | Types.ObjectId = undefined
	let resultUser: undefined | Types.ObjectId = undefined
	let resultProduct: undefined | Types.ObjectId = undefined

	if (id !== undefined) {
		if (typeof id !== 'string') {
			return createErrorMessage('_id must be string')
		}

		if (!Types.ObjectId.isValid(id)) {
			return createErrorMessage('_id string must be ObjectId.isValid')
		}

		resultId = new Types.ObjectId(id)
	}

	if (typeof user !== 'string') {
		return createErrorMessage('user must be undefined | string')
	}

	if (!Types.ObjectId.isValid(user)) {
		return createErrorMessage('user string must be ObjectId.isValid')
	}

	resultUser = new Types.ObjectId(user)

	if (typeof product !== 'string') {
		return createErrorMessage('product must be undefined | string')
	}

	if (!Types.ObjectId.isValid(product)) {
		return createErrorMessage('product string must be ObjectId.isValid')
	}

	resultProduct = new Types.ObjectId(product)

	let resultCount: undefined | number = undefined
	let resultProductPrice: undefined | number = undefined

	if (Number(count) === NaN) {
		return createErrorMessage('address must be string')
	}

	resultCount = Number(count)

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

const checkProductIsExists = async (id: Types.ObjectId): Promise<boolean> => {
	const productResult = await Product.findOne({ _id: id })

	return productResult !== null
}

const checkUserIsExists = async (id: Types.ObjectId): Promise<boolean> => {
	const result = await User.findOne({ _id: id })

	return result !== null
}

export const createNewOrder = async (req: Request, res: Response) => {
	const params = getQueryParams(req.body)

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

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	const newOrderParams = getValidParamsWithCheckID<getQueryParamsOk['value']>(
		params.value
	)

	if ((await checkProductIsExists(newOrderParams.product)) === false) {
		return res
			.status(Codes.ERROR)
			.json(createErrorMessage('Product id is not valid'))
	}

	if ((await checkUserIsExists(newOrderParams.user)) === false) {
		return res
			.status(Codes.ERROR)
			.json(createErrorMessage('User id is not valid'))
	}

	new Order(newOrderParams).save((error, result) => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		return res.status(Codes.OK).json(result)
	})
}
