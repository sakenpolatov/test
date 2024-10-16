'use client'

import { reloadSession } from '@@/lib/reloadSession'
import { signOut } from 'next-auth/react'
import { IoIosLogOut } from 'react-icons/io'

const LogoutButton = () => {
	const handleSignOut = async () => {
		await signOut({ redirect: true, callbackUrl: '/signin' })
		reloadSession()
	}

	return (
		<IoIosLogOut
			size={24}
			className='text-white cursor-pointer'
			onClick={handleSignOut}
		/>
	)
}

export default LogoutButton
