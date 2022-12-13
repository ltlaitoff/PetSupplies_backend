import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Product, ProductsAllInfo } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import { getValidParamsWithCheckAll } from '../../helpers/getValidParams'
import { getUserAdminLevelByAuthorizaionHeader } from '../helpers/getUserAdminLevel'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId
		description: string | undefined
		characteristics: string | undefined
	}
}

const getQueryParams = (
	req: Request
): ErrorMessageAnswer | getQueryParamsOk => {
	const { productId, description, characteristics } = req.query

	if (typeof productId !== 'string') {
		return createErrorMessage('productId must be undefined | string')
	}

	if (!Types.ObjectId.isValid(productId)) {
		return createErrorMessage('productId string must be ObjectId.isValid')
	}

	let resultId = new Types.ObjectId(productId)

	if (description !== undefined) {
		if (typeof description !== 'string') {
			return createErrorMessage('Comment must be string')
		}
	}

	if (characteristics !== undefined) {
		if (typeof characteristics !== 'string') {
			return createErrorMessage('Comment must be string')
		}
	}

	return {
		status: Status.OK,
		value: {
			id: resultId,
			description,
			characteristics,
		},
	}
}

export const updateProductAllInfo = async (req: Request, res: Response) => {
	const params = getQueryParams(req)

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

	const { id } = params.value

	const productIdObjectId = new Types.ObjectId(id)

	const product = await Product.findOne({ _id: productIdObjectId })

	if (product === null) {
		return res
			.status(Codes.ERROR)
			.json(createErrorMessage('Product with id = productId is not defined'))
	}

	const allInfoId = product.allInfo

	const updatedParams = getValidParamsWithCheckAll(params.value)

	ProductsAllInfo.updateOne({ _id: allInfoId }, updatedParams, null, error => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		ProductsAllInfo.findOne({ _id: allInfoId }).exec(
			(findError, findResult) => {
				if (findError) {
					return res
						.status(Codes.ERROR)
						.json(createErrorMessage('Something went wrong.' + findError.name))
				}

				return res.status(Codes.OK).json(findResult)
			}
		)
	})
}
