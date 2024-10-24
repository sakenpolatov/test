import React, { memo, useEffect } from 'react'
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell
} from '@/components/ui/table'
import { MdDeleteForever } from 'react-icons/md'
import NoMarkers from './NoMarkers'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { deleteMark, fetchMarks } from '@/redux/asyncActions/marksActions'
import {
	setCoordinates,
	setCurrentCoordinates
} from '@/redux/slices/marksSlice'
import { ICoordinates } from '@@/types/types'

const TableMarks = () => {
	const dispatch = useAppDispatch()
	const markers = useAppSelector(state => state.marks.markers)

	useEffect(() => {
		dispatch(fetchMarks())
	}, [dispatch])

	const handleRowClick = (coordinates: ICoordinates) => {
		if (coordinates && coordinates.latitude && coordinates.longitude) {
			dispatch(setCurrentCoordinates(coordinates))
		} else {
			console.error('Координаты не указаны для этой метки.')
		}
	}

	return (
		<>
			{markers.length === 0 ? (
				<NoMarkers />
			) : (
				<div className='w-full overflow-x-auto max-w-4xl mx-auto border-2 border-gray-500 shadow-lg rounded-md'>
					<Table className='min-w-full'>
						<TableHeader>
							<TableRow>
								<TableHead className='bg-gray-500 text-gray-700 w-1/12 border border-black text-center'>
									Тип
								</TableHead>
								<TableHead className='bg-gray-500 text-gray-700 w-4/12 border border-black text-center'>
									Локация
								</TableHead>
								<TableHead className='bg-gray-500 text-gray-700 w-3/12 border border-black text-center'>
									Источник информации
								</TableHead>
								<TableHead className='bg-gray-500 text-gray-700 w-3/12 border border-black text-center'>
									Комментарии
								</TableHead>
								<TableHead className='bg-gray-500 text-gray-700 w-4/12 border border-black text-center'>
									Координаты
								</TableHead>
								<TableHead className='bg-gray-500 text-gray-700 w-1/12 border border-black text-center'>
									Удалить
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{markers.map(item => (
								<TableRow
									key={item._id}
									className='hover:bg-transparent cursor-pointer'
									onClick={() => handleRowClick(item.coordinates)} // Добавляем клик по строке
								>
									<TableCell className='bg-gray-600 whitespace-nowrap border-black text-center'>
										{item.type}
									</TableCell>
									<TableCell className='bg-gray-600 whitespace-nowrap border-black text-center'>
										{item.address}
									</TableCell>
									<TableCell className='bg-gray-600 whitespace-nowrap border-black text-center'>
										{item.label}
									</TableCell>
									<TableCell className='bg-gray-600 whitespace-nowrap border-black text-center'>
										{item.description}
									</TableCell>
									<TableCell className='bg-gray-600 whitespace-nowrap border-black text-center'>
										{item.coordinates
											? `${item.coordinates.latitude}, ${item.coordinates.longitude}`
											: 'Не указаны'}
									</TableCell>
									<TableCell className='bg-gray-600 whitespace-nowrap border-black text-center'>
										<button
											onClick={e => {
												e.stopPropagation() // Остановить клик по строке при удалении
												dispatch(deleteMark(item._id))
											}}
											className='text-gray-500 hover:text-white'
										>
											<MdDeleteForever className='w-6 h-6' />
										</button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</>
	)
}

export default memo(TableMarks)
