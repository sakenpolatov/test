'use client'

import React, { useState } from 'react'
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
	const data = [
		{
			type: '124',
			location: 'ул Пушкина, д 123, Москва',
			source: 'Школа №123',
			comment: 'Близко к центру',
			dateAdded: '2023-01-01 14:32:10'
		},
		{
			type: '125',
			location: 'ул Ленина, д 5, Москва',
			source: 'Кафе "Московское утро"',
			comment: 'Отличный кофе',
			dateAdded: '2023-01-01 16:45:23'
		},
		{
			type: '126',
			location: 'ул Мира, д 8, Москва',
			source: 'Магазин "Седьмой континент"',
			comment: 'Большой ассортимент',
			dateAdded: '2023-01-02 10:15:40'
		},
		{
			type: '127',
			location: 'ул Красная, д 10, Москва',
			source: 'Памятник архитектуры',
			comment: 'Историческое место',
			dateAdded: '2023-01-03 11:55:12'
		},
		{
			type: '128',
			location: 'ул Тверская, д 6, Москва',
			source: 'Торговый центр "Москва"',
			comment: 'Много магазинов',
			dateAdded: '2023-01-04 18:25:00'
		},
		{
			type: '129',
			location: 'ул Арбат, д 10, Москва',
			source: 'Театр "Арбат"',
			comment: 'Рекомендуем к посещению',
			dateAdded: '2023-01-05 09:12:45'
		}
	]

	// Определяем состояние для текущей страницы и количества элементов на странице
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 1

	// Логика для извлечения элементов на текущей странице
	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

	// Общее количество страниц
	const totalPages = Math.ceil(data.length / itemsPerPage)

	// Функция для изменения текущей страницы
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
						<TableHead className='bg-gray-500 text-gray-700 w-2/12 border border-black text-center'>
							Дата добавления
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{currentItems.map((item, index) => (
						<TableRow key={index} className='hover:bg-transparent'>
							<TableCell className=' bg-gray-600 whitespace-nowrap border-black text-center'>
								{item.type}
							</TableCell>
							<TableCell className=' bg-gray-600 whitespace-nowrap border-black text-center'>
								{item.location}
							</TableCell>
							<TableCell className=' bg-gray-600 whitespace-nowrap border-black text-center'>
								{item.source}
							</TableCell>
							<TableCell className=' bg-gray-600 whitespace-nowrap border-black text-center'>
								{item.comment}
							</TableCell>
							<TableCell className=' bg-gray-600 whitespace-nowrap border-black text-center'>
								{item.dateAdded}
							</TableCell>
						</TableRow>
					))}
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
