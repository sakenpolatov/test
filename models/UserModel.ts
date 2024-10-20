import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export interface IUser extends Document {
	_id: Types.ObjectId
	name: string
	email?: string
	password?: string
	provider: string
	telegramId?: string
	markers: Types.ObjectId[]
}

const UserSchema: Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		sparse: true
	},
	password: {
		type: String
	},
	telegramId: {
		type: String,
		unique: true,
		sparse: true
	},
	provider: {
		type: String,
		default: 'credentials'
	},
	markers: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Marker'
		}
	]
})

const User: Model<IUser> =
	mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
