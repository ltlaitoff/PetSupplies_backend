import { Schema } from 'mongoose'

function allFieldsRequiredByDefault(schema: Schema) {
	for (var i in schema.paths) {
		const attribute = schema.paths[i]

		if (
			attribute.isRequired == undefined &&
			attribute.path !== 'createdAt' &&
			attribute.path !== 'updatedAt'
		) {
			attribute.required(true)
		}
	}
}

export { allFieldsRequiredByDefault }
