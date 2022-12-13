import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Order } from '../../models'
import { Codes } from '../../types'
import {
	createErrorMessage,
	createSuccessMessage,
} from '../../helpers/messages'
import { getUserAdminLevelByAuthorizaionHeader } from '../helpers/getUserAdminLevel'

export const deleteOrder = async (req: Request, res: Response) => {
	const id = req.params._id

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

	if (typeof id !== 'string') {
		return createErrorMessage('Id must be string')
	}

	if (!Types.ObjectId.isValid(id)) {
		return createErrorMessage('Id string must be ObjectId.isValid')
	}

	const idAsObjectId = new Types.ObjectId(id)

	Order.deleteOne({ _id: idAsObjectId }, error => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		return res
			.status(Codes.OK)
			.json(createSuccessMessage(`Order ${id} successfully deleted`))
	})
}
