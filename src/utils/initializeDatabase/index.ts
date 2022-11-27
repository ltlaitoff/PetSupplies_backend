import { initializeDatabaseCategory } from './Category'
import { initializeDatabaseType } from './Type'

const initializeDataBase = () => {
	initializeDatabaseType()
	initializeDatabaseCategory()
}

export { initializeDataBase }
