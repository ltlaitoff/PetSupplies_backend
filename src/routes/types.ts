import Router, { Request, Response } from 'express'
import {
	createNewType,
	deleteType,
	getType,
	updateType,
	getAllTypes,
} from '../controllers/Type'

const TypesRouter = Router()

TypesRouter.get('/type/all', getAllTypes)
TypesRouter.get('/type', getType)
TypesRouter.post('/type', createNewType)
TypesRouter.delete('/type/:_id', deleteType)
TypesRouter.put('/type', updateType)

export { TypesRouter }
