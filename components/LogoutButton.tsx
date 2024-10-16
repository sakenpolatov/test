'use client'

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { IoIosLogOut } from 'react-icons/io'

const LogoutButton = () => {
	const handleSignOut = async () => {
		await signOut({ redirect: true, callbackUrl: '/signin' })
	}

	return (
		<Button variant='destructive' onClick={handleSignOut}>
			<IoIosLogOut />
		</Button>
	)
}

export default LogoutButton
