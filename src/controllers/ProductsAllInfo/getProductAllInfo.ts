import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Product, ProductsAllInfo } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		productId: Types.ObjectId
	}
}

const getQueryParams = (
	req: Request
): ErrorMessageAnswer | getQueryParamsOk => {
	const { productId } = req.query

	if (typeof productId !== 'string') {
		return createErrorMessage('productId must be string-ObjectId')
	}

	if (!Types.ObjectId.isValid(productId)) {
		return createErrorMessage('productId string must be ObjectId.isValid')
	}

	let resultId = new Types.ObjectId(productId)

	return {
		status: Status.OK,
		value: {
			productId: resultId,
		},
	}
}

export const getProductAllInfo = async (req: Request, res: Response) => {
	const params = getQueryParams(req)

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	const { productId } = params.value

	const productIdObjectId = new Types.ObjectId(productId)

	const product = await Product.findOne({ _id: productIdObjectId })

	if (product === null) {
		return res
			.status(Codes.ERROR)
			.json(createErrorMessage('Product with id = productId is not defined'))
	}

	const allInfoId = product.allInfo

	ProductsAllInfo.findOne({ _id: allInfoId }, { __v: 0 }).exec(
		(error, result) => {
			if (error) {
				return res
					.status(Codes.ERROR)
					.json(createErrorMessage('Something went wrong.' + error.name))
			}

			return res.status(Codes.OK).json(result)
		}
	)
}
