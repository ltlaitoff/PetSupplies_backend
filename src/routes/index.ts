import Router, { Request, Response } from 'express'
import { User } from '../models'

/*
TESTROUTER.get('/test', (req: Request, res: Response) => {
	console.log(req.headers)
	if (req.headers.authorization) {
		const base64 = req.headers.authorization.replace('Basic ', '')
		console.log(base64)

		const [login, password] = atob(base64).split(':')

		User.find({ name: login, password: password }).then((err, value) => {
			console.log(err, value)
		})
	}
	res.json({ s: 1 })
})
*/

export { HomeRouter } from './home'
export { AccountLevelRouter } from './accountLevel'
export { CategoriesRouter } from './categories'
export { ProducerRouter } from './producers'
export { TypesRouter } from './types'
export { OrdersRouter } from './orders'
