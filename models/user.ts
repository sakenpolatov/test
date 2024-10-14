import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
	name: string
	email?: string
	password?: string
	provider: string
	telegramId?: string
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
	provider: {
		type: String,
		default: 'credentials'
	},
	telegramId: {
		type: String,
		unique: true,
		sparse: true
	}
})

const User: Model<IUser> =
	mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
