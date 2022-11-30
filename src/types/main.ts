export enum Status {
	OK = 'ok',
	ERROR = 'error',
}

export enum Codes {
	OK = 200,
	ERROR = 500,
}

type MessageAnswer<T extends Status> = {
	status: T
	message: string
}

export type SuccessMessageAnswer = MessageAnswer<Status.OK>
export type ErrorMessageAnswer = MessageAnswer<Status.ERROR>
