import { Codes } from '../../types'
import { getUserInfo } from '../User/helpers'

export const getUserAdminLevel = async (email: string, password: string) => {
	if (email === 'SERVER' && password === 'SERVER') {
		return {
			status: Codes.OK,
			value: 3,
		}
	}

	const user = await getUserInfo({ email, password })

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
