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

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get a categories by query params
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A Array of JSON objects containing _id, title and description
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *       '500':
 *         description: Standart error message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'error'
 *                   description: Status of query = Error
 *                 message:
 *                   type: string
 *                   example: 'Something went wrong, {error name}'
 *                   description: Message of error
 */
CategoriesRouter.get('/categories', getCategories)

/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Categories]
 *     summary: Add a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 required: false
 *               title:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: true
 *           examples:
 *             withId:
 *               value:
 *                 _id: '638785594eb73fc2e0a4e07c'
 *                 title: 'Title'
 *                 description: 'Description'
 *             withotId:
 *               value:
 *                 title: 'Title'
 *                 description: 'Description'
 *     responses:
 *       '200':
 *         description: A JSON object containing all info of created category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *       '500':
 *         description: Standart error message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'error'
 *                   description: Status of query = Error
 *                 message:
 *                   type: string
 *                   example: 'Something went wrong, {error name}'
 *                   description: Message of error
 */
CategoriesRouter.post('/categories', createNewCategory)

/**
 * @swagger
 * /categories/{_id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Delete category
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'ok'
 *                   description: Status of query = OK
 *                 message:
 *                   type: string
 *                   example: 'Category {_id} successfully deleted'
 *                   description: Message of success
 *       '500':
 *         description: Standart error message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'error'
 *                   description: Status of query = Error
 *                 message:
 *                   type: string
 *                   example: 'Something went wrong, {error name}'
 *                   description: Message of error
 */
CategoriesRouter.delete('/categories/:_id', deleteCategory)

/**
 * @swagger
 * /categories:
 *   put:
 *     tags: [Categories]
 *     summary: Update category info
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON object containing all info of created category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *       '500':
 *         description: Standart error message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'error'
 *                   description: Status of query = Error
 *                 message:
 *                   type: string
 *                   example: 'Something went wrong, {error name}'
 *                   description: Message of error
 */
CategoriesRouter.put('/categories', updateCategory)

export { CategoriesRouter }
