export enum Status {
	OK = 'ok',
	ERROR = 'error',
	NOT_FOUND = 'not found',
	UNAUTHORIZED = 'user is unauthorized',
}

export enum Codes {
	OK = 200,
	ERROR = 500,
	NOT_FOUND = 404,
	UNAUTHORIZED = 401,
}

type MessageAnswer<T extends Status> = {
	status: T
	message: string
}

export type SuccessMessageAnswer = MessageAnswer<Status.OK>
export type ErrorMessageAnswer = MessageAnswer<Status.ERROR>
export type NotFoundMessageAnswer = MessageAnswer<Status.NOT_FOUND>
