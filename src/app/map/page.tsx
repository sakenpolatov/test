import React from 'react'
import FormMark from './ui/FormMark'
import YandexMap from './ui/YandexMap'
import TableMarks from './ui/TableMarks'

const MapPage = () => {
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
