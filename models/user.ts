import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
	name: string
	email: string
	password: string
	provider: string
}

const UserSchema: Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	provider: {
		type: String,
		default: 'credentials'
	}
})

const User: Model<IUser> =
	mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
