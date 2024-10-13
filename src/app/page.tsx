import { auth } from '@@/lib/auth'

export default async function App() {
	const session = await auth()

	return (
		<main className='flex min-h-screen items-center justify-center p-24'>
			<div className='text-center'>
				<h1 className='text-3xl font-bold mb-6'>Welcome to the App</h1>
				{session && session.user ? (
					<div>
						<p className='text-lg'>Signed in as {session.user?.email}</p>
						<p className='text-lg'>Name: {session.user?.name}</p>
					</div>
				) : (
					<p className='text-lg'>You are not signed in</p>
				)}
			</div>
		</main>
	)
}
