import Router, { Request, Response } from 'express'

const router = Router()

router.use((req: Request, res: Response, next) => {
	console.log('[Server]: Time = ', Date.now())
	next()
})

router.get('/', (req: Request, res: Response) => {
	res.status(200).json({ page: 'home', type: 'get' })
})

router.post('/', (req: Request, res: Response) => {
	res.status(200).json({ page: 'home', type: 'post' })
})

export { router as HomeRouter }
