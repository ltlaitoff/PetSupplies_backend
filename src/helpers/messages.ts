import {
	Status,
	ErrorMessageAnswer,
	SuccessMessageAnswer,
	NotFoundMessageAnswer,
} from '../types'

export const createErrorMessage = (message: string): ErrorMessageAnswer => ({
	status: Status.ERROR,
	message: message,
})

export const createNotFoundMessage = (
	message: string
): NotFoundMessageAnswer => ({
	status: Status.NOT_FOUND,
	message: message,
})

export const createSuccessMessage = (
	message: string
): SuccessMessageAnswer => ({
	status: Status.OK,
	message: message,
})
