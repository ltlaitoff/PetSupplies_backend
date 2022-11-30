import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Producer } from '../../models'
import { Codes } from '../../types'
import {
	createErrorMessage,
	createSuccessMessage,
} from '../../helpers/messages'

export const deleteProducer = (req: Request, res: Response) => {
	const id = req.params._id

	if (typeof id !== 'string') {
		return createErrorMessage('Id must be string')
	}

	if (!Types.ObjectId.isValid(id)) {
		return createErrorMessage('Id string must be ObjectId.isValid')
	}

	const idAsObjectId = new Types.ObjectId(id)

	Producer.deleteOne({ _id: idAsObjectId }, error => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		return res
			.status(Codes.OK)
			.json(createSuccessMessage(`Producer ${id} successfully deleted`))
	})
}
