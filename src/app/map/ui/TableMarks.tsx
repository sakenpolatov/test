import React, { memo, useEffect, useMemo, useState } from 'react'
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
import { useMarks } from '@/context/MarksContext'

const TableMarks = () => {
	const { marks, handleDelete, setCurrentCoordinates } = useMarks()
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 1

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage

	const currentItems = useMemo(() => {
		return marks.slice(indexOfFirstItem, indexOfLastItem)
	}, [marks, currentPage])

	const totalPages = Math.ceil(marks.length / itemsPerPage)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	useEffect(() => {
		const coordinates = currentItems.map(item => item.coordinates)
		setCurrentCoordinates(coordinates)
	}, [currentItems, setCurrentCoordinates])

	return (
		<>
			{marks.length === 0 ? (
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
							{currentItems.map((item, index) => (
								<TableRow key={index} className='hover:bg-transparent'>
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
											onClick={() => handleDelete(item._id)}
											className='text-gray-500 hover:text-white'
										>
											<MdDeleteForever className='w-6 h-6' />
										</button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<Pagination className='mt-4'>
						<PaginationPrevious
							onClick={() =>
								handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
							}
						/>
						<PaginationContent>
							{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
								<PaginationItem key={page}>
									<PaginationLink
										isActive={page === currentPage}
										onClick={() => handlePageChange(page)}
									>
										{page}
									</PaginationLink>
								</PaginationItem>
							))}
						</PaginationContent>
						<PaginationNext
							onClick={() =>
								handlePageChange(
									currentPage < totalPages ? currentPage + 1 : totalPages
								)
							}
						/>
					</Pagination>
				</div>
			)}
		</>
	)
}

export default memo(TableMarks)
