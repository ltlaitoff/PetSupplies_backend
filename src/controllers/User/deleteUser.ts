import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { User } from '../../models'
import { Codes } from '../../types'
import {
	createErrorMessage,
	createSuccessMessage,
} from '../../helpers/messages'

export const deleteUser = (req: Request, res: Response) => {
	console.log(req.params)
	const id = req.params._id

	// TODO: Add check on admin level 2

	if (typeof id !== 'string') {
		return createErrorMessage('Id must be string')
	}

	if (!Types.ObjectId.isValid(id)) {
		return createErrorMessage('Id string must be ObjectId.isValid')
	}

	const idAsObjectId = new Types.ObjectId(id)

	console.log(idAsObjectId)

	User.deleteOne({ _id: idAsObjectId }, error => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		return res
			.status(Codes.OK)
			.json(createSuccessMessage(`User ${id} successfully deleted`))
	})
}
