import Link from 'next/link'
import { IoLogInOutline } from 'react-icons/io5'

const LoginButton = () => {
	return (
		<Link href='/signin'>
			<IoLogInOutline size={24} className='text-white cursor-pointer' />
		</Link>
	)
}

export default LoginButton
