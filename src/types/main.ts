export enum Status {
	OK = 'ok',
	ERROR = 'error',
	NOT_FOUND = 'not found',
}

export enum Codes {
	OK = 200,
	ERROR = 500,
	NOT_FOUND = 404,
}

type MessageAnswer<T extends Status> = {
	status: T
	message: string
}

export type SuccessMessageAnswer = MessageAnswer<Status.OK>
export type ErrorMessageAnswer = MessageAnswer<Status.ERROR>
export type NotFoundMessageAnswer = MessageAnswer<Status.NOT_FOUND>
