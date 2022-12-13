import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { Product } from '../../models'
import { Codes } from '../../types'
import { checkQueryObjectId } from '../../helpers/checkQuery'
import {
	createErrorMessage,
	createSuccessMessage,
} from '../../helpers/messages'

export const deleteProduct = (req: Request, res: Response) => {
	const id = req.params._id

	// TODO: Add check on admin level 2

	if (typeof id !== 'string') {
		return res.status(Codes.ERROR).json(createErrorMessage('Id must be string'))
	}

	if (!Types.ObjectId.isValid(id)) {
		return res
			.status(Codes.ERROR)
			.json(createErrorMessage('Id string must be ObjectId.isValid'))
	}

	const idAsObjectId = new Types.ObjectId(id)

	Product.deleteOne({ _id: idAsObjectId }, error => {
		if (error) {
			return res
				.status(Codes.ERROR)
				.json(createErrorMessage('Something went wrong.' + error.name))
		}

		return res
			.status(Codes.OK)
			.json(createSuccessMessage(`Product ${id} successfully deleted`))
	})
}
