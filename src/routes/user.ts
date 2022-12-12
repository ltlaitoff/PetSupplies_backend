import Router, { Request, Response } from 'express'
import {
	getUser,
	createNewUser,
	deleteUser,
	updateUserInfo,
	changeUserPassword,
	getAllUsers,
} from '../controllers/User'

const UserRouter = Router()

UserRouter.get('/user', getUser)
UserRouter.post('/user', createNewUser)
UserRouter.delete('/user/:_id', deleteUser)
UserRouter.put('/user', updateUserInfo)
UserRouter.put('/user/changePassword', changeUserPassword)
UserRouter.get('/user/all', getAllUsers)

export { UserRouter }
