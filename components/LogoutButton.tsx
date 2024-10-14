'use client'

import { signOut } from 'next-auth/react'

const LogoutButton = () => {
	const handleSignOut = async () => {
		await signOut({ redirect: true, callbackUrl: '/signin' })
	}

	return (
		<button
			onClick={handleSignOut}
			className='bg-red-500 text-white hover:bg-red-600'
		>
			Выйти
		</button>
	)
}

export default LogoutButton
