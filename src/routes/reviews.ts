import Router, { Request, Response } from 'express'
import {
	createNewReview,
	deleteReview,
	getReview,
	updateReview,
	getAllReviews,
} from '../controllers/Review'

const ReviewRouter = Router()

ReviewRouter.get('/review/all', getAllReviews)
ReviewRouter.get('/review', getReview)
ReviewRouter.post('/review', createNewReview)
ReviewRouter.delete('/review/:_id', deleteReview)
ReviewRouter.put('/review', updateReview)

export { ReviewRouter }
