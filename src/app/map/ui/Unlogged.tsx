'use client'

import React from 'react'
import Link from 'next/link'

const Unlogged = () => {
	return (
		<main className='flex h-full items-center justify-center p-24'>
			<div className='text-center'>
				<h1 className='text-3xl font-bold mb-6'>У вас нет доступа</h1>
				<p className='mb-6 text-lg text-gray-300 max-w-md mx-auto'>
					Для просмотра меток и карт необходимо войти в систему. Авторизуйтесь,
					чтобы получить доступ ко всем функциям приложения.
				</p>
				<Link href='/signin'>
					<button className='px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 ease-in-out'>
						Войти
					</button>
				</Link>
			</div>
		</main>
	)
}

export default Unlogged
