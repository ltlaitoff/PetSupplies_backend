import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { User } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import { getValidParamsWithCheckAll } from '../../helpers/getValidParams'
import { getUserInfoResponse } from './helpers'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId | undefined
		surname: string | undefined
		name: string | undefined
		email: string | undefined
		country: string | undefined
		city: string | undefined
		zipCode: number | undefined
		address: string | undefined
		accountAdminLevel: Types.ObjectId | undefined
	}
}

const getQueryParams = (
	req: Request
): ErrorMessageAnswer | getQueryParamsOk => {
	const {
		id,
		surname,
		name,
		email,
		country,
		city,
		zipCode,
		address,
		accountAdminLevel,
	} = req.query

	let resultId: undefined | Types.ObjectId = undefined

	if (id !== undefined) {
		if (typeof id !== 'string') {
			return createErrorMessage('Id must be undefined | string')
		}

		if (!Types.ObjectId.isValid(id)) {
			return createErrorMessage('Id string must be ObjectId.isValid')
		}

		resultId = new Types.ObjectId(id)
	}

	if (surname !== undefined) {
		if (typeof surname !== 'string') {
			return createErrorMessage('surname must be string | undefined')
		}
	}

	if (name !== undefined) {
		if (typeof name !== 'string') {
			return createErrorMessage('name must be string | undefined')
		}
	}

	if (email !== undefined) {
		if (typeof email !== 'string') {
			return createErrorMessage('email must be string | undefined')
		}
	}

	if (country !== undefined) {
		if (typeof country !== 'string') {
			return createErrorMessage('country must be string | undefined')
		}
	}

	if (city !== undefined) {
		if (typeof city !== 'string') {
			return createErrorMessage('city must be string | undefined')
		}
	}

	if (address !== undefined) {
		if (typeof address !== 'string') {
			return createErrorMessage('address must be string | undefined')
		}
	}

	let resultZipCode: number | undefined = undefined

	if (zipCode !== undefined) {
		if (Number(zipCode) === NaN) {
			return createErrorMessage('zipCode must be valid number | undefined')
		}

		resultZipCode = Number(zipCode)
	}

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

		resultAccountAdminLevelId = new Types.ObjectId(id)
	}

	return {
		status: Status.OK,
		value: {
			id: resultId,
			surname,
			name,
			email,
			country,
			city,
			zipCode: resultZipCode,
			address,
			accountAdminLevel: resultAccountAdminLevelId,
		},
	}
}

export const getUser = async (req: Request, res: Response) => {
	const params = getQueryParams(req)

	if (params.status === Status.ERROR) {
		return res.status(Codes.ERROR).json(params)
	}

	const findParams = getValidParamsWithCheckAll(params.value)

	await getUserInfoResponse(findParams, res)
}
