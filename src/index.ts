import dotenv from 'dotenv'
import express from 'express'
import { connect, mongo } from 'mongoose'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

import {
	HomeRouter,
	AccountLevelRouter,
	CategoriesRouter,
	ProducerRouter,
	TypesRouter,
	OrdersRouter,
	ProductRouter,
	ReviewRouter,
	ProductAllInfoRouter,
	UserRouter,
} from './routes'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

console.log(new mongoose.Types.ObjectId('638387eb6f33fac689be5e82'))

dotenv.config()

connect(
	`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@petsupplies.thsr3db.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
)
	.then(() => {
		console.log('[Server]: DB connected')
	})

	.catch(err => {
		console.error('[Server]: DB error connect', err)
	})

const app = express()
const port = process.env.PORT

app.use(cors())

const options = {
	failOnErrors: true,
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'PetSupplies API',
			version: '0.0.0',
			description: 'PetSupplies API description',
			servers: [`http://localhost:${port}`],
		},
	},
	apis: ['./src/routes/*.ts', './src/swagger/*.yaml'],
}

const openapiSpecification = swaggerJsDoc(options)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(HomeRouter)
app.use(CategoriesRouter)
app.use(TypesRouter)
app.use(ProducerRouter)
app.use(AccountLevelRouter)
app.use(OrdersRouter)
app.use(ProductRouter)
app.use(ReviewRouter)
app.use(ProductAllInfoRouter)
app.use(UserRouter)

app.listen(port, () => {
	console.log(`[Server]: Server is running at http://localhost:${port}`)
})
