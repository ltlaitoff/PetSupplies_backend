import mongoose, { Types } from 'mongoose'
import { Request, Response } from 'express'
import { User } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import { getValidParamsWithCheckID } from '../../helpers/getValidParams'
import { getUserInfoResponse } from './helpers'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId | undefined
		surname: string
		name: string
		email: string
		phone: string
		password: string
		country: string
		city: string
		zipCode: number
		address: string
		accountAdminLevel: Types.ObjectId | undefined
	}
}

const getQueryParams = (
	body: Request['body']
): ErrorMessageAnswer | getQueryParamsOk => {
	const {
		_id,
		surname,
		name,
		email,
		phone,
		password,
		country,
		city,
		zipCode,
		address,
		accountAdminLevel,
	} = body

	let resultId: undefined | Types.ObjectId = undefined

	if (_id !== undefined) {
		if (typeof _id !== 'string') {
			return createErrorMessage('_id must be undefined | string')
		}

		if (!Types.ObjectId.isValid(_id)) {
			return createErrorMessage('_id string must be ObjectId.isValid')
		}

		console.log(_id, new Types.ObjectId(_id))

		resultId = new Types.ObjectId(_id)
	}

	if (typeof surname !== 'string') {
		return createErrorMessage('surname must be string')
	}

	if (typeof name !== 'string') {
		return createErrorMessage('name must be string')
	}

	if (typeof email !== 'string') {
		return createErrorMessage('email must be string')
	}

	if (typeof country !== 'string') {
		return createErrorMessage('country must be string')
	}

	if (typeof city !== 'string') {
		return createErrorMessage('city must be string')
	}

	if (typeof address !== 'string') {
		return createErrorMessage('address must be string')
	}

	if (typeof phone !== 'string') {
		return createErrorMessage('phone must be string')
	}

	if (typeof password !== 'string') {
		return createErrorMessage('password must be string')
	}

	if (Number(zipCode) === NaN) {
		return createErrorMessage('zipCode must be valid number')
	}

	let resultZipCode = Number(zipCode)

	let resultAccountAdminLevelId: undefined | Types.ObjectId = undefined

	if (accountAdminLevel !== undefined) {
		if (typeof accountAdminLevel !== 'string') {
			return createErrorMessage('accountAdminLevel must be undefined | string')
		}

		if (!Types.ObjectId.isValid(accountAdminLevel)) {
			return createErrorMessage(
				'accountAdminLevel string must be ObjectId.isValid'
			)
		}

		resultAccountAdminLevelId = new Types.ObjectId(accountAdminLevel)
	}

	return {
		status: Status.OK,
		value: {
			id: resultId,
			surname,
			name,
			email,
			phone,
			password,
			country,
			city,
			zipCode: resultZipCode,
			address,
			accountAdminLevel: resultAccountAdminLevelId,
		},
	}
}

export const createNewUser = async (req: Request, res: Response) => {
	const params = getQueryParams(req.body)

	// TODO: Add check on admin level 2
	// TODO: default accountLevelId

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	const { id } = params.value

	const newCategoryParams = getValidParamsWithCheckID(params.value)

	new User(newCategoryParams).save(error => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		getUserInfoResponse({ _id: id }, res)
	})
}
