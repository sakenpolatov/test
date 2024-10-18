'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FaUserTie } from 'react-icons/fa'
import LogoutButton from '@@/components/LogoutButton'
import LoginButton from '@@/components/LoginButton'
import { usePathname } from 'next/navigation'

const NavBar = () => {
	const { data: session } = useSession()
	const pathname = usePathname()

	if (pathname === '/signin' || pathname === '/signup') {
		return null
	}

	return (
		<nav className='bg-gray-800 p-4 flex justify-between items-center h-16 px-24'>
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
				{session ? (
					<>
						<div className='flex items-center space-x-2'>
							<FaUserTie size={24} />
							<span className='text-white'>
								{session.user?.name || 'Guest'}
							</span>
						</div>
						<LogoutButton />
					</>
				) : (
					<LoginButton />
				)}
			</div>
		</nav>
	)
}

export default NavBar
