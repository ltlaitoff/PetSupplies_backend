import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { User } from '../../models'
import { Status, ErrorMessageAnswer, Codes } from '../../types'
import { createErrorMessage } from '../../helpers/messages'
import { getValidParamsWithCheckAll } from '../../helpers/getValidParams'
import { getUserInfoResponse } from './helpers'
import { getUserAdminLevelByAuthorizaionHeader } from '../helpers/getUserAdminLevel'

type getQueryParamsOk = {
	status: Status.OK
	value: {
		id: Types.ObjectId
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

	if (typeof id !== 'string') {
		return createErrorMessage('Id must be string-ObjectId')
	}

	if (!Types.ObjectId.isValid(id)) {
		return createErrorMessage('Id string must be ObjectId.isValid')
	}

	const resultId = new Types.ObjectId(id)

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

		resultAccountAdminLevelId = new Types.ObjectId(accountAdminLevel)
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

export const updateUserInfo = async (req: Request, res: Response) => {
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

	const { id } = params.value

	const updatedParams = getValidParamsWithCheckAll(params.value)

	User.findOneAndUpdate({ _id: id }, updatedParams).then(() => {
		getUserInfoResponse({ _id: id }, res)
	})
}
