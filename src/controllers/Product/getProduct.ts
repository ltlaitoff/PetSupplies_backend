import mongoose, { Types } from 'mongoose'
import { Request, Response } from 'express'
import {
	AccountLevel,
	Category,
	Producer,
	Product,
	ProductsAllInfo,
	Type,
	User,
} from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import {
	getValidParamsWithCheckAll,
	getValidParamsWithCheckID,
} from '../../helpers/getValidParams'
import { checkQueryObjectIdWithUndefined } from '../../helpers/checkQuery'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId | undefined
		titleEN: string | undefined
		titleUA: string | undefined
		descriptionEN: string | undefined
		descriptionUA: string | undefined
		price: number | undefined
		stars: number | undefined
		image: string | undefined
		type: Array<Types.ObjectId> | undefined
		category: Array<Types.ObjectId> | undefined
		producer: Types.ObjectId | undefined
		novelty: boolean | undefined
		discount: boolean | undefined
		discountValue: boolean | undefined
		discountPreviousPrice: boolean | undefined
		creator: Types.ObjectId | undefined
	}
}

const checkElementsIsExists = async (
	ids: Types.ObjectId[],
	Model: typeof mongoose.Model
) => {
	const documents = ids.map(element => {
		return Model.findOne({ _id: element })
	})

	return !(await Promise.all(documents)).reduce(
		(acc, current) => acc || current === null,
		false
	)
}

const checkTypesIsExists = async (ids: Types.ObjectId[]) => {
	return await checkElementsIsExists(ids, Type)
}

const checkCategoriesIsExists = async (ids: Types.ObjectId[]) => {
	return await checkElementsIsExists(ids, Category)
}

const checkProducerIsExists = async (id: Types.ObjectId) => {
	return (await Producer.findOne({ _id: id })) !== null
}

const checkCreatorIsExists = async (id: Types.ObjectId) => {
	return (await User.findOne({ _id: id })) !== null
}

const getQueryParams = (
	req: Request
): ErrorMessageAnswer | getQueryParamsOk => {
	const {
		id,
		titleEN,
		titleUA,
		descriptionEN,
		descriptionUA,
		price,
		stars,
		image,
		type,
		category,
		producer,
		novelty,
		discount,
		discountValue,
		discountPreviousPrice,
		creator,
	} = req.query

	let resultId: undefined | Types.ObjectId = undefined

	if (id !== undefined) {
		if (typeof id !== 'string') {
			return createErrorMessage('_id must be undefined | string')
		}

		if (!Types.ObjectId.isValid(id)) {
			return createErrorMessage('_id string must be ObjectId.isValid')
		}

		resultId = new Types.ObjectId(id)
	}

	if (titleEN !== undefined && typeof titleEN !== 'string') {
		return createErrorMessage('titleEN must be a undefined | string')
	}

	if (titleUA !== undefined && typeof titleUA !== 'string') {
		return createErrorMessage('titleUA must be a undefined | string')
	}

	if (descriptionEN !== undefined && typeof descriptionEN !== 'string') {
		return createErrorMessage('descriptionEN must be a undefined | string')
	}

	if (descriptionUA !== undefined && typeof descriptionUA !== 'string') {
		return createErrorMessage('descriptionUA must be a undefined | string')
	}

	let resultPrice: number | undefined = undefined

	if (price !== undefined) {
		if (typeof price !== 'string') {
			return createErrorMessage(
				'price must be a undefined | valid number as string'
			)
		}

		if (Number(stars) === NaN) {
			return createErrorMessage('price must be valid number')
		}

		resultPrice = Number(price)
	}

	let resultStars: number | undefined = undefined

	if (stars !== undefined) {
		if (typeof stars !== 'string') {
			return createErrorMessage(
				'stars must be a undefined | valid number as string'
			)
		}

		if (Number(stars) === NaN) {
			return createErrorMessage('stars must be valid number')
		}

		resultStars = Number(stars)
	}

	if (image !== undefined && typeof image !== 'string') {
		return createErrorMessage('image must be a undefined | string')
	}

	let resultType: Array<Types.ObjectId> | undefined = undefined

	if (type !== undefined) {
		if (!(type instanceof Array)) {
			return createErrorMessage(
				'type must be undefined | Array of string-ObjectId'
			)
		}

		// @ts-expect-error
		const arrayType = Array.from(type)

		if (
			arrayType.reduce((acc, current) => {
				return acc || !Types.ObjectId.isValid(current)
			}, false)
		) {
			return createErrorMessage(
				'All type elements must be string-ObjectId and pass ObjectId.isValid validation'
			)
		}

		resultType = arrayType.map(element => new Types.ObjectId(element))
	}

	let resultCategory: Array<Types.ObjectId> | undefined = undefined

	if (category !== undefined) {
		if (!(category instanceof Array)) {
			return createErrorMessage(
				'category must be undefined | Array of string-ObjectId'
			)
		}

		// @ts-expect-error
		const arrayCategory = Array.from(category)

		if (
			arrayCategory.reduce((acc, current) => {
				return acc || !Types.ObjectId.isValid(current)
			}, false)
		) {
			return createErrorMessage(
				'All type elements must be string-ObjectId and pass ObjectId.isValid validation'
			)
		}

		resultCategory = arrayCategory.map(element => new Types.ObjectId(element))
	}

	let resultProducer: undefined | Types.ObjectId = undefined

	if (category !== undefined) {
		if (typeof producer !== 'string' || !Types.ObjectId.isValid(producer)) {
			return createErrorMessage('producter must be undefined | string-ObjectId')
		}

		resultProducer = new Types.ObjectId(producer)
	}

	if (novelty !== undefined && typeof novelty !== 'boolean') {
		return createErrorMessage('novelty must be a undefined | boolean')
	}

	if (discount !== undefined && typeof discount !== 'boolean') {
		return createErrorMessage('discount must be a undefined | boolean')
	}

	if (discountValue !== undefined && typeof discountValue !== 'number') {
		return createErrorMessage('discountValue must be a undefined | number')
	}

	if (
		discountPreviousPrice !== undefined &&
		typeof discountPreviousPrice !== 'number'
	) {
		return createErrorMessage(
			'discountPreviousPrice must be a undefined | number'
		)
	}

	let resultCreator: Types.ObjectId | undefined = undefined

	if (creator !== undefined) {
		if (typeof creator !== 'string' || !Types.ObjectId.isValid(creator)) {
			return createErrorMessage('creator must be undefined | string-ObjectId')
		}

		resultCreator = new Types.ObjectId(creator)
	}

	return {
		status: Status.OK,
		value: {
			id: resultId,
			titleEN,
			titleUA,
			descriptionEN,
			descriptionUA,
			price: resultPrice,
			stars: resultStars,
			image,
			type: resultType,
			category: resultCategory,
			producer: resultProducer,
			novelty,
			discount,
			discountValue,
			discountPreviousPrice,
			creator: resultCreator,
		},
	}
}

export const getProduct = async (req: Request, res: Response) => {
	const params = getQueryParams(req)

	// TODO: Add check on admin level 2

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	const { type, category, producer, creator } = params.value

	if (type !== undefined && !checkTypesIsExists(type)) {
		return res.status(Codes.ERROR).json(createErrorMessage('Invalid type'))
	}

	if (category !== undefined && !checkCategoriesIsExists(category)) {
		return res
			.status(Codes.ERROR)
			.json(createErrorMessage('Invalid categories'))
	}

	if (producer !== undefined && !checkProducerIsExists(producer)) {
		return res.status(Codes.ERROR).json(createErrorMessage('Invalid producer'))
	}

	if (creator !== undefined && !checkCreatorIsExists(creator)) {
		return res.status(Codes.ERROR).json(createErrorMessage('Invalid creator'))
	}

	const productFindParams = getValidParamsWithCheckAll(params.value)

	console.log(productFindParams)

	Product.findOne(productFindParams, { __v: 0 })
		.populate('type', { __v: 0 })
		.populate('category', { __v: 0 })
		.populate('producer', { __v: 0 })
		.populate('allInfo', { __v: 0 })
		.populate('creator', { __v: 0, phone: 0, password: 0 })
		.exec((error, result) => {
			if (error) {
				return res
					.status(Codes.ERROR)
					.json(createErrorMessage('Something went wrong.' + error.name))
			}

			return res.status(Codes.OK).json(result)
		})
}
