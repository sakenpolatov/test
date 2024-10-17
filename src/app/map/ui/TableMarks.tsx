import React from 'react'
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell
} from '@/components/ui/table'

const TableMarks = () => {
	const data = [
		{
			type: '124',
			location: 'ул Пушкина д 123',
			source: 'другой юзер',
			comment: 'бум',
			dateAdded: 'Date'
		}
	]

	return (
		<div className='w-full bg-gray-500 overflow-x-auto max-w-4xl mx-auto border-2  p-4 border-white shadow-lg rounded-md'>
			<Table className='min-w-full border-collapse border-2 border-black'>
				<TableHeader>
					<TableRow className='border-2 border-black'>
						<TableHead className='bg-gray-500 text-gray-700 border-2 border-black'>
							Тип
						</TableHead>
						<TableHead className='bg-gray-500 text-gray-700 border-2 border-black'>
							Локация
						</TableHead>
						<TableHead className='bg-gray-500 text-gray-700 border-2 border-black'>
							Источник информации
						</TableHead>
						<TableHead className='bg-gray-500 text-gray-700 border-2 border-black'>
							Комментарии
						</TableHead>
						<TableHead className='bg-gray-500 text-gray-700 border-2 border-black'>
							Дата добавления
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((item, index) => (
						<TableRow
							key={index}
							className='border-2 border-black hover:bg-transparent'
						>
							<TableCell className='text-center bg-gray-600 border-2 border-black'>
								{item.type}
							</TableCell>
							<TableCell className='text-center bg-gray-600 border-2 border-black'>
								{item.location}
							</TableCell>
							<TableCell className='text-center bg-gray-600 border-2 border-black'>
								{item.source}
							</TableCell>
							<TableCell className='text-center bg-gray-600 border-2 border-black'>
								{item.comment}
							</TableCell>
							<TableCell className='text-center bg-gray-600 border-2 border-black'>
								{item.dateAdded}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export default TableMarks
