import mongoose, { Schema, ObjectId } from 'mongoose'
import { Category } from '../../models'

const initializeDatabaseCategory = async () => {
	await Category.deleteMany({})

	const createCategoryInitialize = (
		_id: mongoose.Types.ObjectId,
		title: string,
		description: string
	) => {
		return new Category({
			_id: _id,
			title: title,
			description: description,
		}).save(error => {
			if (error) {
				console.error(`Category ${title} error`, error)
				return
			}

			console.log(`Category ${title} has been added`)
		})
	}

	createCategoryInitialize(
		new mongoose.Types.ObjectId('638387eb6f33fac689be5e81'),
		'Care',
		'Care'
	)
	createCategoryInitialize(
		new mongoose.Types.ObjectId('638387eb6f33fac689be5e82'),
		'Walk',
		'Walk'
	)
	createCategoryInitialize(
		new mongoose.Types.ObjectId('638387eb6f33fac689be5e83'),
		'Health',
		'Health'
	)
	createCategoryInitialize(
		new mongoose.Types.ObjectId('638387eb6f33fac689be5e84'),
		'Toys',
		'Toys'
	)
	createCategoryInitialize(
		new mongoose.Types.ObjectId('638387eb6f33fac689be5e85'),
		'SleepingPlaces',
		'SleepingPlaces'
	)
	createCategoryInitialize(
		new mongoose.Types.ObjectId('638387eb6f33fac689be5e80'),
		'Bowls',
		'Bowls'
	)
}

export { initializeDatabaseCategory }
