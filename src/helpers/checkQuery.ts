import { Types } from 'mongoose'
import { createErrorMessage } from './messages'
import { ErrorMessageAnswer, Status } from '../types/main'

export const checkQueryObjectId = (
	value: unknown
): { status: Status.OK; value: Types.ObjectId } | ErrorMessageAnswer => {
	if (typeof value !== 'string') {
		return createErrorMessage('Id must be undefined | string')
	}

	if (!Types.ObjectId.isValid(value)) {
		return createErrorMessage('Id string must be ObjectId isValid')
	}

	return {
		status: Status.OK,
		value: new Types.ObjectId(value),
	}
}

export const checkQueryObjectIdWithUndefined = (
	value: unknown
):
	| ErrorMessageAnswer
	| { status: Status.OK; value: Types.ObjectId | undefined } => {
	if (value === undefined)
		return {
			status: Status.OK,
			value: undefined,
		}

	if (typeof value !== 'string') {
		return createErrorMessage('Id must be undefined | string')
	}

	if (!Types.ObjectId.isValid(value)) {
		return createErrorMessage('Id string must be ObjectId isValid')
	}

	return {
		status: Status.OK,
		value: new Types.ObjectId(value),
	}
}
