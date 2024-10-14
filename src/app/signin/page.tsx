'use client'

import { signIn } from 'next-auth/react'

import { useState } from 'react'

export default function SignIn() {
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (formData: FormData) => {
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		const result = await signIn('credentials', {
			redirect: true,
			email,
			password,
			callbackUrl: '/'
		})

		if (result?.error) {
			setError(result.error)
		}
	}

	return (
		<form
			onSubmit={async e => {
				e.preventDefault()
				const formData = new FormData(e.target as HTMLFormElement)
				await handleSubmit(formData)
			}}
		>
			<label>Email</label>
			<input name='email' type='email' required />
			<label>Password</label>
			<input name='password' type='password' required />
			<button type='submit'>Sign In</button>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</form>
	)
}
