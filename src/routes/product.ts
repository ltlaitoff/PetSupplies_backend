import Router, { Request, Response } from 'express'
import {
	createNewProduct,
	deleteProduct,
	getAllProducts,
	getProduct,
	updateProductInfo,
} from '../controllers/Product'

const ProductRouter = Router()

ProductRouter.get('/product/all', getAllProducts)
ProductRouter.get('/product', getProduct)
ProductRouter.delete('/product/:_id', deleteProduct)
ProductRouter.post('/product', createNewProduct)
ProductRouter.put('/product', updateProductInfo)

export { ProductRouter }
