'use client'

import React, { useState, useEffect } from 'react'
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

const TableMarks = () => {
	const [marks, setMarks] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 1

	useEffect(() => {
		const fetchMarks = async () => {
			try {
				const response = await fetch('/api/markers')
				const data = await response.json()
				setMarks(data.markers)
			} catch (error) {
				console.error('Ошибка при получении меток:', error)
			}
		}

		fetchMarks()
	}, [])

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = marks.slice(indexOfFirstItem, indexOfLastItem)

	const totalPages = Math.ceil(marks.length / itemsPerPage)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	return (
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
					</TableRow>
				</TableHeader>
				<TableBody>
					{currentItems.length > 0 ? (
						currentItems.map((item: any, index) => (
							<TableRow key={index} className='hover:bg-transparent'>
								<TableCell className=' bg-gray-600 whitespace-nowrap border-black text-center'>
									{item.type}
								</TableCell>
								<TableCell className=' bg-gray-600 whitespace-nowrap border-black text-center'>
									{item.address}
								</TableCell>
								<TableCell className=' bg-gray-600 whitespace-nowrap border-black text-center'>
									{item.label}
								</TableCell>
								<TableCell className=' bg-gray-600 whitespace-nowrap border-black text-center'>
									{item.description}
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={4} className='text-center'>
								Нет данных
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			{/* Компонент пагинации */}
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
	)
}

export default TableMarks
