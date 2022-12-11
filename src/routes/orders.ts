import Router, { Request, Response } from 'express'
import {
	getAllOrders,
	getOrder,
	createNewOrder,
	updateOrder,
	deleteOrder,
} from '../controllers/Order'

const OrdersRouter = Router()

OrdersRouter.get('/order/all', getAllOrders)
OrdersRouter.get('/order', getOrder)
OrdersRouter.post('/order', createNewOrder)
OrdersRouter.put('/order', updateOrder)
OrdersRouter.delete('/order/:_id', deleteOrder)

export { OrdersRouter }
