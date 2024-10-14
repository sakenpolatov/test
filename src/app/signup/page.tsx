'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function Register() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)

	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		setError(null)
		setSuccess(null)

		const res = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, password })
		})

		const data = await res.json()

		if (res.status !== 201) {
			setError(data.message)
		} else {
			setSuccess('User registered successfully!')

			const signInResult = await signIn('credentials', {
				redirect: false,
				email,
				password
			})

			if (!signInResult?.error) {
				router.push('/')
			}
		}
	}

	return (
		<main className='flex min-h-screen items-center justify-center p-24'>
			<div className='max-w-md w-full'>
				<h1 className='text-3xl font-bold mb-6 text-center'>Register</h1>

				{error && <p className='text-red-500 mb-4'>{error}</p>}
				{success && <p className='text-green-500 mb-4'>{success}</p>}

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label
							htmlFor='name'
							className='block text-sm font-medium text-gray-700'
						>
							Name
						</label>
						<input
							type='text'
							id='name'
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							value={name}
							onChange={e => setName(e.target.value)}
							required
						/>
					</div>

					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-700'
						>
							Email
						</label>
						<input
							type='email'
							id='email'
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</div>

					<div>
						<label
							htmlFor='password'
							className='block text-sm font-medium text-gray-700'
						>
							Password
						</label>
						<input
							type='password'
							id='password'
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
					</div>

					<button
						type='submit'
						className='w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700'
					>
						Register
					</button>
				</form>
			</div>
		</main>
	)
}
