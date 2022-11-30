import Router, { Request, Response } from 'express'
import {
	createNewType,
	deleteType,
	getType,
	updateType,
	getAllTypes,
} from '../controllers/Type'

const TypesRouter = Router()

/**
 * @swagger
 * /type/all:
 *   get:
 *     tags: [Types]
 *     summary: Get all types
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
TypesRouter.get('/type/all', getAllTypes)

/**
 * @swagger
 * /type:
 *   get:
 *     tags: [Types]
 *     summary: Get a type by query params
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
 *         description: A JSON object containing _id, title and description
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
TypesRouter.get('/type', getType)

/**
 * @swagger
 * /type:
 *   post:
 *     tags: [Types]
 *     summary: Add a new type
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
 *                 title: 'Title type'
 *                 description: 'Description type'
 *             withotId:
 *               value:
 *                 title: 'Title type'
 *                 description: 'Description type'
 *     responses:
 *       '200':
 *         description: A JSON object containing all info of created type
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
TypesRouter.post('/type', createNewType)

/**
 * @swagger
 * /type/{_id}:
 *   delete:
 *     tags: [Types]
 *     summary: Delete type
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
 *                   example: 'Type {_id} successfully deleted'
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
TypesRouter.delete('/type/:_id', deleteType)

/**
 * @swagger
 * /type:
 *   put:
 *     tags: [Types]
 *     summary: Update type info
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
 *         description: A JSON object containing all info of updated type
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
TypesRouter.put('/type', updateType)

export { TypesRouter }
