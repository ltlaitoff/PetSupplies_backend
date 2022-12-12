import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Product, Review, ProductsAllInfo } from '../../models'
import { Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'

const checkProductIsExists = async (id: Types.ObjectId): Promise<boolean> => {
	const productResult = await Product.findOne({ _id: id })

	return productResult !== null
}

const checkReviewIsExists = async (id: Types.ObjectId): Promise<boolean> => {
	const result = await Review.findOne({ _id: id })

	return result !== null
}

export const addReviewProductAllInfo = async (req: Request, res: Response) => {
	const { productId, reviewId } = req.query

	if (typeof productId !== 'string') {
		return res
			.status(Codes.ERROR)
			.json(createErrorMessage('productId must be strisng-ObjectId'))
	}

	if (!Types.ObjectId.isValid(productId)) {
		return res
			.status(Codes.ERROR)
			.json(createErrorMessage('productId string must be ObjectId.isValid'))
	}

	if (typeof reviewId !== 'string') {
		return res
			.status(Codes.ERROR)
			.json(createErrorMessage('reviewId must be string-ObjectId'))
	}

	if (!Types.ObjectId.isValid(reviewId)) {
		return res
			.status(Codes.ERROR)
			.json(createErrorMessage('reviewId string must be ObjectId.isValid'))
	}

	const productIdObjectId = new Types.ObjectId(productId)
	const reviewIdObjectId = new Types.ObjectId(reviewId)

	if ((await checkProductIsExists(productIdObjectId)) === false) {
		return res
			.status(Codes.ERROR)
			.json(createErrorMessage('Product id is not valid'))
	}

	if ((await checkReviewIsExists(reviewIdObjectId)) === false) {
		return res
			.status(Codes.ERROR)
			.json(createErrorMessage('Review id is not valid'))
	}

	const product = await Product.findOne({ _id: productIdObjectId })

	if (product === null) {
		return res
			.status(Codes.ERROR)
			.json(createErrorMessage('Product id is not valid'))
	}

	const allInfoId = product.allInfo

	ProductsAllInfo.updateOne(
		{ _id: allInfoId },
		{ $push: { reviews: reviewIdObjectId } },
		null,
		error => {
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
							.json(
								createErrorMessage('Something went wrong.' + findError.name)
							)
					}

					return res.status(Codes.OK).json(findResult)
				}
			)
		}
	)
}
