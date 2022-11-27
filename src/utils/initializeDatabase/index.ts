import { initializeDatabaseCategory } from './Category'
import { initializeDatabaseType } from './Type'
import { initializeDatabaseAccountLevel } from './AccountLevel'

const initializeDataBase = () => {
	initializeDatabaseType()
	initializeDatabaseCategory()
	initializeDatabaseAccountLevel()
}

export { initializeDataBase }
