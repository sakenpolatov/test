import LogoutButton from '@@/components/LogoutButton'
import { auth } from '@@/lib/auth'
import { FaUserTie } from 'react-icons/fa'

export default async function NavBar() {
	const session = await auth()

	if (!session || !session.user) return null

	return (
		<nav className='bg-gray-800 p-4 flex justify-between items-center h-16'>
			<ul className='flex space-x-6'>
				<li>
					<a
						href='/'
						className='text-white text-lg hover:text-gray-300 transition-colors duration-200'
					>
						Home
					</a>
				</li>
				<li>
					<a
						href='/map'
						className='text-white text-lg hover:text-gray-300 transition-colors duration-200'
					>
						Map
					</a>
				</li>
				<li>
					<a
						href='/info'
						className='text-white text-lg hover:text-gray-300 transition-colors duration-200'
					>
						Info
					</a>
				</li>
			</ul>
			<div className='flex items-center space-x-4'>
				<div className='flex items-center space-x-2'>
					<FaUserTie size={24} className='text-white' />{' '}
					<span className='text-white text-lg'>
						{session.user.name || 'Guest'}
					</span>{' '}
				</div>
				<LogoutButton />
			</div>
		</nav>
	)
}
