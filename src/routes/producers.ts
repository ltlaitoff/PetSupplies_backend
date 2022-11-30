import Router, { Request, Response } from 'express'
import {
	createNewProducer,
	deleteProducer,
	getProducer,
	updateProducer,
	getAllProducers,
} from '../controllers/Producer'

const ProducerRouter = Router()

/**
 * @swagger
 * /producer/all:
 *   get:
 *     tags: [Producers]
 *     summary: Get all producers
 *     responses:
 *       '200':
 *         description: A Array of JSON objects containing _id, title and description, website, createdAt and updatedAt
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
 *                   title:
 *                     type: string
 *                     example: "Producer title"
 *                   description:
 *                     type: string
 *                     example: "Producer description"
 *                   website:
 *                     type: string
 *                     example: "http://example.com/"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Last updated date and time
 *                     example: "2022-12-30T12:00:00Z"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Created date and time
 *                     example: "2022-11-30T12:00:00Z"
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
ProducerRouter.get('/producer/all', getAllProducers)

/**
 * @swagger
 * /producer:
 *   get:
 *     tags: [Producers]
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
 *       - in: query
 *         name: website
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON object containing _id, title and description, website, createdAt and updatedAt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "638785594eb73fc2e0a4e07c"
 *                 title:
 *                   type: string
 *                   example: "Producer title"
 *                 description:
 *                   type: string
 *                   example: "Producer description"
 *                 website:
 *                   type: string
 *                   example: "http://example.com/"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last updated date and time
 *                   example: "2022-12-30T12:00:00Z"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Created date and time
 *                   example: "2022-11-30T12:00:00Z"
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
ProducerRouter.get('/producer', getProducer)

/**
 * @swagger
 * /producer:
 *   post:
 *     tags: [Producers]
 *     summary: Add a new producer
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
 *               website:
 *                 type: string
 *                 required: true
 *           examples:
 *             withId:
 *               value:
 *                 _id: '638785594eb73fc2e0a4e07c'
 *                 title: 'Title producer'
 *                 description: 'Description type'
 *                 website: 'http://example.com/'
 *             withotId:
 *               value:
 *                 title: 'Title producer'
 *                 description: 'Description type'
 *                 website: 'http://example.com/'
 *     responses:
 *       '200':
 *         description: A JSON object containing _id, title and description, website, createdAt and updatedAt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "638785594eb73fc2e0a4e07c"
 *                 title:
 *                   type: string
 *                   example: "Producer title"
 *                 description:
 *                   type: string
 *                   example: "Producer description"
 *                 website:
 *                   type: string
 *                   example: "http://example.com/"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last updated date and time
 *                   example: "2022-12-30T12:00:00Z"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Created date and time
 *                   example: "2022-11-30T12:00:00Z"
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
ProducerRouter.post('/producer', createNewProducer)

/**
 * @swagger
 * /producer/{_id}:
 *   delete:
 *     tags: [Producers]
 *     summary: Delete producer
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
 *                   example: 'Producer {_id} successfully deleted'
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
ProducerRouter.delete('/producer/:_id', deleteProducer)

/**
 * @swagger
 * /producer:
 *   put:
 *     tags: [Producers]
 *     summary: Update producer info
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
 *       - in: query
 *         name: website
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON object containing _id, title and description, website, createdAt and updatedAt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "638785594eb73fc2e0a4e07c"
 *                 title:
 *                   type: string
 *                   example: "Producer title"
 *                 description:
 *                   type: string
 *                   example: "Producer description"
 *                 website:
 *                   type: string
 *                   example: "http://example.com/"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last updated date and time
 *                   example: "2022-12-30T12:00:00Z"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Created date and time
 *                   example: "2022-11-30T12:00:00Z"
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
ProducerRouter.put('/producer', updateProducer)

export { ProducerRouter }
