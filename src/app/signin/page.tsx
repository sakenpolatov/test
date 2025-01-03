import { auth } from '@@/lib/auth'
import { redirect } from 'next/navigation'
import LoginForm from './Form'

export default async function SignIn() {
	const session = await auth()

	if (session) {
		redirect('/')
	}

	return (
		<section className='flex items-center justify-center min-h-screen bg-gray-800 dark:bg-gray-900'>
			<div className='max-w-md w-full bg-gray-700 dark:bg-gray-800 p-8 border-2 border-gray-500 shadow-md rounded-lg'>
				<h1 className='text-3xl text-center font-semibold mb-6 text-gray-200 dark:text-gray-300'>
					Вход
				</h1>
				<LoginForm />
			</div>
		</section>
	)
}
