'use client'

import React from 'react'

import YandexMap from './ui/YandexMap'
import TableMarks from './ui/TableMarks'
import { useSession } from 'next-auth/react'
import Unlogged from './ui/Unlogged'
import Loader from '@@/components/Loader/loader'

const MapPage = () => {
	const { data: session, status } = useSession()

	if (status === 'loading') {
		return <Loader />
	}

	if (!session) {
		return <Unlogged />
	}

	return (
		<main className='flex flex-col items-center justify-center p-24 space-y-6'>
			<div className='flex w-full justify-center'>
				<YandexMap />
			</div>
			<div className='w-full flex justify-center'>
				<TableMarks />
			</div>
		</main>
	)
}

export default MapPage
