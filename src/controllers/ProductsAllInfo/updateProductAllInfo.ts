import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Product, ProductsAllInfo } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import { getValidParamsWithCheckAll } from '../../helpers/getValidParams'

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

	// TODO: Add check on admin level 2

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
