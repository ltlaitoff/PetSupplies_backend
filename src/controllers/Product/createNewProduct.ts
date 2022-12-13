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
import { getValidParamsWithCheckID } from '../../helpers/getValidParams'
import { checkQueryObjectIdWithUndefined } from '../../helpers/checkQuery'
import { getUserAdminLevelByAuthorizaionHeader } from '../helpers/getUserAdminLevel'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId | undefined
		title: {
			en: string
			ua: string
		}
		description: {
			en: string
			ua: string
		}
		price: number
		stars: number
		image: string
		type: Array<Types.ObjectId>
		category: Array<Types.ObjectId>
		producer: Types.ObjectId
		novelty: boolean | undefined
		discount: boolean | undefined
		discountValue: boolean | undefined
		discountPreviousPrice: boolean | undefined
		creator: Types.ObjectId
		allInfo?: Types.ObjectId
	}
}

/*
console.log('Types true: ', await checkTypesIsExists(
		[
			new Types.ObjectId('6383529877588dc76e74919c'),
			new Types.ObjectId('6383529877588dc76e74919d'),
		]
	))

	console.log('Types false: ', await checkTypesIsExists(
		[
			new Types.ObjectId('6383529877588dc76e74919c'),
			new Types.ObjectId('6383529877588dc76e74919d'),
			new Types.ObjectId('6383529877588dc76e74919b'),
		]
	))


	console.log('Categories true: ', await checkCategoriesIsExists(
		[
			new Types.ObjectId('638387eb6f33fac689be5e82'),
			new Types.ObjectId('638387eb6f33fac689be5e83'),
			new Types.ObjectId('638387eb6f33fac689be5e84'),
		]
	))

	console.log('Categories false: ', await checkCategoriesIsExists(
		[
			new Types.ObjectId('638387eb6f33fac689be5e82'),
			new Types.ObjectId('638387eb6f33fac689be5e83'),
			new Types.ObjectId('638387eb6f33fac689be5b97'),
		]
	))
*/

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
	body: Request['body']
): ErrorMessageAnswer | getQueryParamsOk => {
	const {
		id: _id,
		title: { en: titleEN, ua: titleUA },
		description: { en: descriptionEN, ua: descriptionUA },
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
	} = body

	let resultId: undefined | Types.ObjectId = undefined

	if (_id !== undefined) {
		if (typeof _id !== 'string') {
			return createErrorMessage('_id must be undefined | string')
		}

		if (!Types.ObjectId.isValid(_id)) {
			return createErrorMessage('_id string must be ObjectId.isValid')
		}

		resultId = new Types.ObjectId(_id)
	}

	if (typeof titleEN !== 'string') {
		return createErrorMessage('title.en must be a string')
	}

	if (typeof titleUA !== 'string') {
		return createErrorMessage('title.ua must be a string')
	}

	if (typeof descriptionEN !== 'string') {
		return createErrorMessage('description.en must be a string')
	}

	if (typeof descriptionUA !== 'string') {
		return createErrorMessage('description.ua must be a string')
	}

	if (typeof price !== 'number') {
		return createErrorMessage('price must be a number')
	}

	if (typeof stars !== 'number') {
		return createErrorMessage('stars must be a number')
	}

	if (typeof image !== 'string') {
		return createErrorMessage('image must be a string')
	}

	if (!(type instanceof Array)) {
		return createErrorMessage('type must be Array of string-ObjectId')
	}

	console.log(
		type.reduce((acc, current) => {
			console.log(acc, current, Types.ObjectId.isValid(current))
			return acc || !Types.ObjectId.isValid(current)
		}, false)
	)

	if (
		type.reduce((acc, current) => {
			return acc || !Types.ObjectId.isValid(current)
		}, false)
	) {
		return createErrorMessage(
			'All type elements must be string-ObjectId and pass ObjectId.isValid validation'
		)
	}

	const resultType = type.map(element => new Types.ObjectId(element))

	if (!(category instanceof Array)) {
		return createErrorMessage('category must be Array of string-ObjectId')
	}

	if (
		category.reduce((acc, current) => {
			return acc || !Types.ObjectId.isValid(current)
		}, false)
	) {
		return createErrorMessage(
			'All categories elements must be string-ObjectId and pass ObjectId.isValid validation'
		)
	}

	const resultCategory = category.map(element => new Types.ObjectId(element))

	if (typeof producer !== 'string' || !Types.ObjectId.isValid(producer)) {
		return createErrorMessage('producter must be string-ObjectId')
	}

	const resultProducer = new Types.ObjectId(producer)

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

	if (typeof creator !== 'string' || !Types.ObjectId.isValid(creator)) {
		return createErrorMessage('creator must be string-ObjectId')
	}

	const resultCreator = new Types.ObjectId(creator)

	return {
		status: Status.OK,
		value: {
			id: resultId,
			title: { en: titleEN, ua: titleUA },
			description: { en: descriptionEN, ua: descriptionUA },
			price,
			stars,
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

/*
{
  "title": {
    "en": "Bowl blue 750ml",
    "ua": "Миска синя 750мл"
  },
  "description": {
    "en": "Bowl blue for dogs 750ml",
    "ua": "Миска синя для собак 750мл"
  },
  "price": 750,
  "stars": 4,
  "image": "http://example.com/image.png",
  "type": ["6383529877588dc76e74919c"],
  "category": ["638387eb6f33fac689be5e81"],
  "producer": "6387d8e96d54c9d8c8ebc1d1",
  "novelty": true,
  "discount": false,
  "discountValue": -1,
  "discountPreviousPrice": -1,
  "creator": "63838e0e49b89657464ac638"
}
*/
export const createNewProduct = async (req: Request, res: Response) => {
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

	const { type, category, producer, creator } = params.value

	if (!checkTypesIsExists(type)) {
		return res.status(Codes.ERROR).json(createErrorMessage('Invalid type'))
	}

	if (!checkCategoriesIsExists(category)) {
		return res
			.status(Codes.ERROR)
			.json(createErrorMessage('Invalid categories'))
	}

	if (!checkProducerIsExists(producer)) {
		return res.status(Codes.ERROR).json(createErrorMessage('Invalid producer'))
	}

	if (!checkCreatorIsExists(creator)) {
		return res.status(Codes.ERROR).json(createErrorMessage('Invalid creator'))
	}

	const productAllInfoId = (
		await new ProductsAllInfo({
			description: 'void',
			characteristics: 'void',
			reviews: [],
		}).save()
	)._id

	const newProductParams = getValidParamsWithCheckID(params.value)

	newProductParams.allInfo = productAllInfoId

	new Product(newProductParams).save((error, result) => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		Product.findOne({ _id: result._id }, { __v: 0 })
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
