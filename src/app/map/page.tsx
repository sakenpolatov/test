import FormMark from '@/components/FormMark'
import YandexMap from '@/components/YandexMap'
import React from 'react'

const MapPage = () => {
	return (
		<main className='flex h-full items-center justify-center p-24'>
			<div className='flex w-full justify-center space-x-6'>
				<div className='w-1/2'>
					<FormMark />
				</div>

				<div className='w-1/2 bg-gray-200 flex items-center justify-center'>
					<YandexMap />
				</div>
			</div>
		</main>
	)
}

export default MapPage
