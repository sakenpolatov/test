import mongoose, { Schema, Document, Types } from 'mongoose'
import User from '@@/models/UserModel'

export interface IMarker extends Document {
	user: Types.ObjectId
	type: string
	address: string
	label: string
	description: string
	coordinates: {
		latitude: number
		longitude: number
	}
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
	},
	coordinates: {
		latitude: {
			type: Number,
			required: true
		},
		longitude: {
			type: Number,
			required: true
		}
	}
})

MarkerSchema.pre(
	'deleteOne',
	{ document: true, query: false },
	async function (next) {
		try {
			await User.updateMany(
				{ markers: this._id },
				{ $pull: { markers: this._id } }
			)
			next()
		} catch (err: unknown) {
			next(err as Error)
		}
	}
)
const Marker =
	mongoose.models.Marker || mongoose.model<IMarker>('Marker', MarkerSchema)

export default Marker
