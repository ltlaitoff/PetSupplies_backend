import { Types } from 'mongoose'

export function getValidParamsWithCheckID<
	T extends { id: Types.ObjectId | undefined }
>(value: T): Omit<T, 'id'> & { _id?: Types.ObjectId } {
	const result = Object.keys(value).reduce((acc, current) => {
		if (current !== 'id') {
			// @ts-expect-error
			return { ...acc, [current]: value[current] }
		}

		if (value[current] !== undefined) {
			return { ...acc, _id: value[current] }
		}

		return acc
	}, {}) as Omit<T, 'id'> & { _id?: Types.ObjectId }

	return result
}

export function getValidParamsWithCheckAll<
	T extends { id: Types.ObjectId | undefined }
>(value: T) {
	const checkedId = getValidParamsWithCheckID(value)

	const res = Object.fromEntries(
		Object.entries(checkedId).filter(([key, value]) => value !== undefined)
	)

	return res
}
