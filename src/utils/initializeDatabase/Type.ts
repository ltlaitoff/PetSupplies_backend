import mongoose, { Schema, ObjectId } from 'mongoose'
import { Type } from '../../models'

const initializeDatabaseType = () => {
	Type.deleteMany({}, () => {})

	const createTypeInitialize = (
		_id: mongoose.Types.ObjectId,
		title: string,
		description: string
	) => {
		return new Type({
			_id: _id,
			title: title,
			description: description,
		}).save(error => {
			if (error) {
				console.error(`Type ${title} error`, error)
				return
			}

			console.log(`Type ${title} has been added`)
		})
	}

	createTypeInitialize(
		new mongoose.Types.ObjectId('6383529877588dc76e74919c'),
		'Cats',
		'Cats'
	)
	createTypeInitialize(
		new mongoose.Types.ObjectId('6383529877588dc76e74919d'),
		'Dogs',
		'Dogs'
	)
}

export { initializeDatabaseType }
