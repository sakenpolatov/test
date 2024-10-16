import { auth } from '@@/lib/auth'
import Link from 'next/link'
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
				<p className='mb-6 text-lg text-gray-700 max-w-md mx-auto'>
					Это приложение создано для того, чтобы вы могли удобно добавлять и
					управлять метками на Яндекс Карте. Оно позволяет отмечать важные места
					и сохранять их для дальнейшего использования.
				</p>
				<Link href='/map'>
					<button className='px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 ease-in-out'>
						Открыть карту
					</button>
				</Link>
			</div>
		</main>
	)
}
