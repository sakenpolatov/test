'use client'
import React, { memo } from 'react'
import { useSession } from 'next-auth/react'
import LogoutButton from '@@/components/LogoutButton'
import { FaUserTie } from 'react-icons/fa'
import Link from 'next/link'

const NavBar = memo(() => {
	const { data: session, status } = useSession()

	if (status === 'loading') return null
	if (!session || !session.user) return null

	return (
		<nav className='bg-gray-800 p-4 flex justify-between items-center h-16'>
			<ul className='flex space-x-6'>
				<li>
					<Link href='/' className='text-white hover:text-gray-300'>
						Home
					</Link>
				</li>
				<li>
					<Link href='/map' className='text-white hover:text-gray-300'>
						Map
					</Link>
				</li>
				<li>
					<Link href='/info' className='text-white hover:text-gray-300'>
						Info
					</Link>
				</li>
			</ul>
			<div className='flex items-center space-x-4'>
				<div className='flex items-center space-x-2'>
					<FaUserTie size={24} />
					<span className='text-white'>{session.user.name || 'Guest'}</span>
				</div>
				<LogoutButton />
			</div>
		</nav>
	)
})

export default NavBar
