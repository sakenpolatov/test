import User from '@@/models/user'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authOptions = {
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			authorize: async credentials => {
				const user = await User.findOne({ email: credentials?.email })

				if (user) {
					const isValidPassword = user.password === credentials?.password
					if (isValidPassword) {
						return user
					}
				}
				return null
			}
		})
	]
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
