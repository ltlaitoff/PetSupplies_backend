import { ProductsAllInfo } from '../../models'

export const createProductAllInfo = async () => {
	return await ProductsAllInfo.create()
}
