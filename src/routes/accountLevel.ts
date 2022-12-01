import Router, { Request, Response } from 'express'
import {
	createNewAccountLevel,
	deleteAccountLevel,
	getAccountLevel,
	updateAccountLevel,
	getAllAccountLevels,
} from '../controllers/AccountLevel'

const AccountLevelRouter = Router()

AccountLevelRouter.get('/accountLevel/all', getAllAccountLevels)
AccountLevelRouter.get('/accountLevel', getAccountLevel)
AccountLevelRouter.post('/accountLevel', createNewAccountLevel)
AccountLevelRouter.delete('/accountLevel/:_id', deleteAccountLevel)
AccountLevelRouter.put('/accountLevel', updateAccountLevel)

export { AccountLevelRouter }
