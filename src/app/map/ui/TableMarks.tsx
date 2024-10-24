import React, { memo, useEffect } from 'react'
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell
} from '@/components/ui/table'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext
} from '@/components/ui/pagination'
import { MdDeleteForever } from 'react-icons/md'
import NoMarkers from './NoMarkers'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

import { deleteMark, fetchMarks } from '@/redux/asyncActions/marksActions'

const TableMarks = () => {
	const dispatch = useAppDispatch()
	const markers = useAppSelector(state => state.marks.marks)

	useEffect(() => {
		dispatch(fetchMarks())
	}, [dispatch])

	return (
		<>
			{markers.length === 0 ? (
				<NoMarkers />
			) : (
				<div className='w-full overflow-x-auto max-w-4xl mx-auto border-2 border-gray-500 shadow-lg rounded-md'>
					<Table className='min-w-full table-fixed'>
						<TableHeader>
							<TableRow>
								<TableHead className='bg-gray-500 text-gray-700 w-1/12 border border-black text-center'>
									Тип
								</TableHead>
								<TableHead className='bg-gray-500 text-gray-700 w-3/12 border border-black text-center'>
									Локация
								</TableHead>
								<TableHead className='bg-gray-500 text-gray-700 w-3/12 border border-black text-center'>
									Источник информации
								</TableHead>
								<TableHead className='bg-gray-500 text-gray-700 w-3/12 border border-black text-center'>
									Комментарии
								</TableHead>
								<TableHead className='bg-gray-500 text-gray-700 w-2/12 border border-black text-center'>
									Координаты
								</TableHead>
								<TableHead className='bg-gray-500 text-gray-700 w-1/12 border border-black text-center'>
									Удалить
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{markers.map(item => (
								<TableRow key={item._id} className='hover:bg-transparent'>
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
											onClick={() => dispatch(deleteMark(item._id))}
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
