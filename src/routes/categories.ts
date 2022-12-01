import Router, { Request, Response } from 'express'
import {
	createNewCategory,
	deleteCategory,
	getCategories,
	updateCategory,
} from '../controllers/Category'

const CategoriesRouter = Router()

CategoriesRouter.use((req: Request, res: Response, next) => {
	console.log('[Server]: Time = ', Date.now())
	next()
})

CategoriesRouter.get('/categories', getCategories)
CategoriesRouter.post('/categories', createNewCategory)
CategoriesRouter.delete('/categories/:_id', deleteCategory)
CategoriesRouter.put('/categories', updateCategory)

export { CategoriesRouter }
