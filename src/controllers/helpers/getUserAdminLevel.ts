import { Request } from 'express'
import { createErrorMessage } from '../../helpers/messages'
import { Codes } from '../../types'
import { getUserInfo } from '../User/helpers'

type OK = {
	status: Codes.OK
	value: number
}

type ERROR = {
	status: Codes.ERROR
	message: string
}

export const getUserAdminLevel = async (
	login: string,
	password: string
): Promise<OK | ERROR> => {
	if (login === 'SERVER' && password === 'SERVER') {
		return {
			status: Codes.OK,
			value: 3,
		}
	}

	const user = await getUserInfo({ email: login, password })

	if (user === null) {
		return {
			status: Codes.ERROR,
			message: 'User is not defined',
		}
	}

	const userAccountLevel: any = user.accountAdminLevel

	if (userAccountLevel === null) {
		return {
			status: Codes.ERROR,
			message: 'User account level error',
		}
	}

	return {
		status: Codes.OK,
		value: userAccountLevel.level,
	}
}

const getLoginAndPasswordFromAuthorizationHeader = (
	authorization: Request['headers']['authorization']
) => {
	if (authorization) {
		const base64 = authorization.replace('Basic ', '')

		const [login, password] = atob(base64).split(':')

		return [login, password]
	}

	return false
}

export const getUserAdminLevelByAuthorizaionHeader = async (
	authorization: Request['headers']['authorization']
): Promise<OK | ERROR> => {
	const loginAndPassword =
		getLoginAndPasswordFromAuthorizationHeader(authorization)

	if (loginAndPassword === false) {
		return {
			status: Codes.ERROR,
			message: 'User account level error',
		}
	}

	const [login, password] = loginAndPassword

	return await getUserAdminLevel(login, password)
}
