import User from '@@/models/user'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { JWT } from 'next-auth/jwt'
import dbConnect from '@@/lib/mongodb'

export const authOptions = {
	pages: {
		signIn: '/signin'
	},
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			authorize: async credentials => {
				await dbConnect()

				const user = await User.findOne({ email: credentials?.email })

				if (user) {
					const isValidPassword = user.password === credentials?.password
					if (isValidPassword) {
						return user
					}
				}
				return null
			}
		}),
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET
		})
	],
	callbacks: {
		async jwt({
			token,
			account,
			profile,
			user
		}: {
			token: JWT
			account?: any
			profile?: any
			user?: any
		}) {
			console.log('JWT Callback: ', token, user)

			await dbConnect()

			if (account?.provider === 'google' && profile) {
				const existingUser = await User.findOne({ email: profile.email })

				if (!existingUser && profile.email) {
					const newUser = await User.create({
						name: profile.name,
						email: profile.email,
						provider: 'google'
					})

					token.id = newUser._id
					token.email = newUser.email
					token.name = newUser.name
				} else if (existingUser) {
					token.id = existingUser._id
					token.email = existingUser.email
					token.name = existingUser.name
				}
			}

			if (user) {
				token.id = user._id
				token.email = user.email
				token.name = user.name
			}

			return token
		},

		async session({ session, token }: { session: any; token: JWT }) {
			console.log('Session Callback: ', session, token)
			session.user.id = token.id
			session.user.email = token.email
			session.user.name = token.name
			return session
		}
	},
	jwt: {
		secret: process.env.AUTH_SECRET,
		maxAge: 30 * 24 * 60 * 60
	}
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
