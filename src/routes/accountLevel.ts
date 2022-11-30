import Router, { Request, Response } from 'express'
import {
	createNewAccountLevel,
	deleteAccountLevel,
	getAccountLevel,
	updateAccountLevel,
	getAllAccountLevels,
} from '../controllers/AccountLevel'

const AccountLevelRouter = Router()

/**
 * @swagger
 * /accountLevel/all:
 *   get:
 *     tags: [AccountLevel]
 *     summary: Get all account levels
 *     responses:
 *       '200':
 *         description: A Array of JSON objects containing _id, level and description
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "638785594eb73fc2e0a4e07c"
 *                   level:
 *                     type: number
 *                     example: 0
 *                   description:
 *                     type: string
 *                     example: "Default level"
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
AccountLevelRouter.get('/accountLevel/all', getAllAccountLevels)

/**
 * @swagger
 * /accountLevel:
 *   get:
 *     tags: [AccountLevel]
 *     summary: Get a account level by query params
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *       - in: query
 *         name: level
 *         schema:
 *           type: number
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON object containing _id, level and description
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "638785594eb73fc2e0a4e07c"
 *                 level:
 *                   type: number
 *                   example: 0
 *                 description:
 *                   type: string
 *                   example: "Default level"
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
AccountLevelRouter.get('/accountLevel', getAccountLevel)

/**
 * @swagger
 * /accountLevel:
 *   post:
 *     tags: [AccountLevel]
 *     summary: Add a new account level
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
 *               level:
 *                 type: number
 *                 required: true
 *               description:
 *                 type: string
 *                 required: true
 *           examples:
 *             withId:
 *               value:
 *                 _id: '638785594eb73fc2e0a4e07c'
 *                 level: 0
 *                 description: 'Default level'
 *             withotId:
 *               value:
 *                 level: 1
 *                 description: 'Moderator'
 *     responses:
 *       '200':
 *         description: A JSON object containing _id, level and description
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "638785594eb73fc2e0a4e07c"
 *                 level:
 *                   type: number
 *                   example: 0
 *                 description:
 *                   type: string
 *                   example: "Default level"
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
AccountLevelRouter.post('/accountLevel', createNewAccountLevel)

/**
 * @swagger
 * /accountLevel/{_id}:
 *   delete:
 *     tags: [AccountLevel]
 *     summary: Delete accountLevel
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
 *                   example: 'AccountL {_id} successfully deleted'
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
AccountLevelRouter.delete('/accountLevel/:_id', deleteAccountLevel)

/**
 * @swagger
 * /accountLevel:
 *   put:
 *     tags: [AccountLevel]
 *     summary: Update accountLevel info
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: level
 *         schema:
 *           type: number
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON object containing _id, level and description
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "638785594eb73fc2e0a4e07c"
 *                 level:
 *                   type: number
 *                   example: 0
 *                 description:
 *                   type: string
 *                   example: "Default level"
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
AccountLevelRouter.put('/accountLevel', updateAccountLevel)

export { AccountLevelRouter }
