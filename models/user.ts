import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
	name: string
	email?: string
	password?: string
	provider: string
	telegramId?: string // Добавлено для Telegram ID
}

const UserSchema: Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		sparse: true // Позволяет null для пользователей без email
	},
	password: {
		type: String
	},
	telegramId: {
		type: String,
		unique: true,
		sparse: true // Позволяет null для пользователей без Telegram ID
	},
	provider: {
		type: String,
		default: 'credentials'
	}
})

const User: Model<IUser> =
	mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
