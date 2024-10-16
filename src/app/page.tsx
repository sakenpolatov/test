import { auth } from '@@/lib/auth'
import { redirect } from 'next/navigation'

export default async function App() {
	const session = await auth()

	if (!session || !session.user) {
		redirect('/signin')
	}

	return (
		<main className='flex h-full items-center justify-center p-24'>
			<div className='text-center'>
				<h1 className='text-3xl font-bold mb-6'>Homepage</h1>
			</div>
		</main>
	)
}
