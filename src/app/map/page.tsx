'use client'

import React from 'react'
import FormMark from './ui/FormMark'
import YandexMap from './ui/YandexMap'
import TableMarks from './ui/TableMarks'
import { useSession } from 'next-auth/react'
import Unlogged from './ui/Unlogged'

const MapPage = () => {
	const { data: session, status } = useSession()

	if (status === 'loading') {
		return <p>Loading...</p>
	}

	if (!session) {
		return <Unlogged />
	}

	return (
		<main className='flex flex-col items-center justify-center p-24 space-y-6'>
			<div className='flex w-full justify-between space-x-6'>
				<div className='w-1/2'>
					<FormMark />
				</div>

				<div className='w-1/2'>
					<YandexMap />
				</div>
			</div>
			<div className='w-full flex justify-center'>
				<TableMarks />
			</div>
		</main>
	)
}

export default MapPage
