import { Status, ErrorMessageAnswer, SuccessMessageAnswer } from '../types'

export const createErrorMessage = (message: string): ErrorMessageAnswer => ({
	status: Status.ERROR,
	message: message,
})

export const createSuccessMessage = (
	message: string
): SuccessMessageAnswer => ({
	status: Status.OK,
	message: message,
})
