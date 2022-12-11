import Router, { Request, Response } from 'express'
import {
	createNewCategory,
	deleteCategory,
	getAllCategories,
	getCategories,
	updateCategory,
} from '../controllers/Category'

const CategoriesRouter = Router()

CategoriesRouter.use((req: Request, res: Response, next) => {
	console.log('[Server]: Time = ', Date.now())
	next()
})

CategoriesRouter.get('/categories/all', getAllCategories)
CategoriesRouter.get('/categories', getCategories)
CategoriesRouter.post('/categories', createNewCategory)
CategoriesRouter.put('/categories', updateCategory)
CategoriesRouter.delete('/categories/:_id', deleteCategory)

export { CategoriesRouter }
