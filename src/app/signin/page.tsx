'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignIn() {
	const router = useRouter()
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (formData: FormData) => {
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		const result = await signIn('credentials', {
			redirect: false,
			email,
			password
		})

		if (result?.error) {
			setError(result.error)
		} else {
			router.push('/dashboard')
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
