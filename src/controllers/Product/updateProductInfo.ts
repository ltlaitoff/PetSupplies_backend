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
import { getUserAdminLevelByAuthorizaionHeader } from '../helpers/getUserAdminLevel'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId
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
		discountValue: number | undefined
		discountPreviousPrice: number | undefined
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
	} = req.query

	if (typeof id !== 'string') {
		return createErrorMessage('_id must be string-ObjectId')
	}

	if (!Types.ObjectId.isValid(id)) {
		return createErrorMessage('_id string must be ObjectId.isValid')
	}

	const resultId = new Types.ObjectId(id)

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

	let resultNovelty: undefined | boolean = undefined

	if (novelty !== undefined) {
		if (typeof novelty !== 'string') {
			return createErrorMessage('novelty must be a undefined | string-boolean')
		}

		if (novelty !== 'true' && novelty !== 'false') {
			return createErrorMessage('novelty must be a "true" | "false"')
		}

		resultNovelty = novelty === 'true'
	}

	let resultDiscount: undefined | boolean = undefined

	if (discount !== undefined) {
		if (typeof discount !== 'string') {
			return createErrorMessage('discount must be a undefined | string-boolean')
		}

		if (discount !== 'true' && discount !== 'false') {
			return createErrorMessage('discount must be a "true" | "false"')
		}

		resultDiscount = discount === 'true'
	}

	let resultDiscountValue: number | undefined = undefined

	if (discountValue !== undefined) {
		if (typeof discountValue !== 'string') {
			return createErrorMessage(
				'discountValue must be a undefined | valid number as string'
			)
		}

		if (Number(discountValue) === NaN) {
			return createErrorMessage('discountValue must be valid number')
		}

		resultDiscountValue = Number(discountValue)
	}

	let resultDiscountPreviousPrice: number | undefined = undefined

	if (discountPreviousPrice !== undefined) {
		if (typeof discountPreviousPrice !== 'string') {
			return createErrorMessage(
				'discountPreviousPrice must be a undefined | valid number as string'
			)
		}

		if (Number(discountPreviousPrice) === NaN) {
			return createErrorMessage('discountPreviousPrice must be valid number')
		}

		resultDiscountPreviousPrice = Number(discountPreviousPrice)
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
			novelty: resultNovelty,
			discount: resultDiscount,
			discountValue: resultDiscountValue,
			discountPreviousPrice: resultDiscountPreviousPrice,
		},
	}
}

export const updateProductInfo = async (req: Request, res: Response) => {
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

	const { id, type, category, producer } = params.value

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

	const updatedParams = getValidParamsWithCheckAll(params.value)

	console.log(updatedParams)

	Product.findOneAndUpdate({ _id: id }, updatedParams).then(() => {
		Product.findOne({ _id: id }, { __v: 0 })
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
	})
}
