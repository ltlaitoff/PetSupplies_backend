import dotenv from 'dotenv'
import express from 'express'
import { connect } from 'mongoose'
import cors from 'cors'

import { CardsRouter, HomeRouter, ProductRouter } from './routes'

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

app.use(HomeRouter)
app.use(ProductRouter)
app.use(CardsRouter)

app.listen(port, () => {
	console.log(`[Server]: Server is running at https://localhost:${port}`)
})
