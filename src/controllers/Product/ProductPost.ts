import mongoose from 'mongoose'
import { Category, Producer, ProductsAllInfo, Type, User } from '../../models'

export const productPostController = async (data: any) => {
	console.log(data)

	const notValidateFields = {
		title: {
			ua: data.titleUA,
			en: data.titleEN,
		},
		description: {
			ua: data.descriptionUA,
			en: data.descriptionEN,
		},
		price: data.price,
		stars: data.stars,
		novelty: data.novelty,
		discount: data.discount,
		discountValue: data.discountValue,
		discountPreviousValue: data.discountPreviousValue,
	}

	const queryType = data.type
	const categoryType = data.category
	const producerType = data.producer
	const creatorQuery = data.creator

	const typeValue = await typeValidate(queryType)
	const categoryValue = await categoryValidate(categoryType)
	const producerValue = await producerValidate(producerType)
	const allInfoValue = await allInfoCreate()
	const creatorValue = await creatorValidate(creatorQuery)

	if (typeValue.status === 'error') {
		return typeValue
	}

	if (categoryValue.status === 'error') {
		return categoryValue
	}

	if (producerValue.status === 'error') {
		return producerValue
	}

	if (creatorValue.status === 'error') {
		return creatorValue
	}

	return {
		...notValidateFields,
		type: typeValue.value,
		category: categoryValue.value,
		producer: producerValue.value,
		creator: creatorValue.value,
		allInfo: allInfoValue.value,
	}
}

const typeValidate = async (type: any) => {
	if (typeof type !== 'string') {
		return {
			status: 'error',
			message: 'Invalid type',
		}
	}

	if (type.includes(',')) {
		const typeArray = type.split(',')

		const equals = typeArray.map(item => {
			return { title: item }
		})

		const result = await Type.find({ $or: equals })

		if (result.length !== typeArray.length) {
			return {
				status: 'error',
				message: 'Invalid type',
			}
		}

		return {
			status: 'ok',
			value: result.map(item => item._id),
		}
	}

	const result = await Type.findOne({ title: type })

	if (result === null) {
		return {
			status: 'error',
			message: 'Invalid type',
		}
	}

	return {
		status: 'ok',
		value: result._id,
	}
}

const categoryValidate = async (category: any) => {
	if (typeof category !== 'string') {
		return {
			status: 'error',
			message: 'Invalid category',
		}
	}

	if (category.includes(',')) {
		const categoryArray = category.split(',')

		const equals = categoryArray.map(item => {
			return { title: item }
		})

		const result = await Category.find({ $or: equals })

		if (result.length !== categoryArray.length) {
			return {
				status: 'error',
				message: 'Invalid category',
			}
		}

		return {
			status: 'ok',
			value: result.map(item => item._id),
		}
	}

	const result = await Category.findOne({ title: category })

	if (result === null) {
		return {
			status: 'error',
			message: 'Invalid category',
		}
	}

	return {
		status: 'ok',
		value: result._id,
	}
}

const producerValidate = async (value: any) => {
	if (typeof value !== 'string') {
		return {
			status: 'error',
			message: 'Invalid producer',
		}
	}

	const result = await Producer.findOne({ title: value })

	if (result === null) {
		return {
			status: 'error',
			message: 'Invalid producer',
		}
	}

	return {
		status: 'ok',
		value: result._id,
	}
}

const allInfoCreate = async () => {
	const allInfo = await new ProductsAllInfo({
		description: 'description',
		characteristics: 'characteristics',
		reviews: [],
	}).save()

	return {
		status: 'ok',
		value: allInfo._id,
	}
}

const creatorValidate = async (value: any) => {
	if (typeof value !== 'string') {
		return {
			status: 'error',
			message: 'Invalid creator',
		}
	}

	const result = await User.findOne({ _id: new mongoose.Types.ObjectId(value) })

	if (result === null) {
		return {
			status: 'error',
			message: 'Invalid creator',
		}
	}

	return {
		status: 'ok',
		value: result._id,
	}
}
