import Router, { Request, Response } from 'express'
import {
	createNewProducer,
	deleteProducer,
	getProducer,
	updateProducer,
	getAllProducers,
} from '../controllers/Producer'

const ProducerRouter = Router()

ProducerRouter.get('/producer/all', getAllProducers)
ProducerRouter.get('/producer', getProducer)
ProducerRouter.post('/producer', createNewProducer)
ProducerRouter.delete('/producer/:_id', deleteProducer)
ProducerRouter.put('/producer', updateProducer)

export { ProducerRouter }
