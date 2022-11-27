import mongoose, { Schema, ObjectId } from 'mongoose'
import { AccountLevel } from '../../models'

const initializeDatabaseAccountLevel = async () => {
	await AccountLevel.deleteMany({})

	const createAccountLevelInitialize = (
		_id: mongoose.Types.ObjectId,
		level: number,
		description: string
	) => {
		return new AccountLevel({
			_id: _id,
			level: level,
			description: description,
		}).save(error => {
			if (error) {
				console.error(`AdminLevel ${level} error`, error)
				return
			}
			console.log(`AdminLevel ${level} has been added`)
		})
	}

	createAccountLevelInitialize(
		new mongoose.Types.ObjectId('63838c77675cff96068e1823'),
		0,
		'Default'
	)

	createAccountLevelInitialize(
		new mongoose.Types.ObjectId('63838c77675cff96068e1824'),
		1,
		'Moderator'
	)

	createAccountLevelInitialize(
		new mongoose.Types.ObjectId('63838c77675cff96068e1825'),
		2,
		'Admin'
	)
}

export { initializeDatabaseAccountLevel }
