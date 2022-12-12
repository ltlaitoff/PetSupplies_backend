import Router, { Request, Response } from 'express'
import {
	getProductAllInfo,
	updateProductAllInfo,
	addReviewProductAllInfo,
} from '../controllers/ProductsAllInfo'

const ProductAllInfoRouter = Router()

ProductAllInfoRouter.get('/productAllInfo', getProductAllInfo)
ProductAllInfoRouter.put('/productAllInfo', updateProductAllInfo)
ProductAllInfoRouter.put('/productAllInfo/addReview', addReviewProductAllInfo)

export { ProductAllInfoRouter }
