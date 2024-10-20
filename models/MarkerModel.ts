import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IMarker extends Document {
	user: Types.ObjectId
	type: string
	address: string
	label: string
	description: string
}

const MarkerSchema: Schema = new mongoose.Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	type: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	label: {
		type: String,
		required: true
	},
	description: {
		type: String
	}
})

const Marker =
	mongoose.models.Marker || mongoose.model<IMarker>('Marker', MarkerSchema)

export default Marker
