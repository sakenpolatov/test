import React, { memo } from 'react'
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell
} from '@/components/ui/table'
import { MdDeleteForever } from 'react-icons/md'
import { useAppDispatch } from '@/redux/hooks'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem
} from '@/components/ui/select'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext
} from '@/components/ui/pagination'
import { usePagination } from '@/hooks/usePagination'
import { initialItemsPerPage } from '@/constants/variables'
import Loader from '@@/components/Loader/loader'
import { useFetchMarksQuery, useDeleteMarkMutation } from '@/redux/api/marksApi'
import NoMarkers from '../NoMarkers'
import { confirmDeleteMarker } from '@/utils/confirmDeleteMarker'
import { handleRowClick } from '@/utils/handleRowClick'

const TableMarks = memo(() => {
	const dispatch = useAppDispatch()
	const { data: markers = [], isLoading, error } = useFetchMarksQuery()
	const [deleteMark] = useDeleteMarkMutation()

	const {
		currentPage,
		totalPages,
		setCurrentPage,
		handleNextPage,
		handlePreviousPage,
		handleItemsPerPageChange,
		visibleItems
	} = usePagination(markers, initialItemsPerPage)

	if (error) {
		console.error('Ошибка при загрузке меток:', error)
	}

	return (
		<div className='relative w-full overflow-x-auto max-w-4xl mx-auto border-2 border-gray-500 shadow-lg rounded-md'>
			{isLoading ? (
				<div className='flex justify-center items-center py-10'>
					<Loader />
				</div>
			) : markers.length === 0 ? (
				<NoMarkers />
			) : (
				<>
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
									<Select onValueChange={handleItemsPerPageChange}>
										<SelectTrigger className='w-[100px] text-black'>
											<SelectValue placeholder={initialItemsPerPage} />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='25'>25</SelectItem>
											<SelectItem value='50'>50</SelectItem>
											<SelectItem value='100'>100</SelectItem>
										</SelectContent>
									</Select>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{visibleItems.map(item => (
								<TableRow
									key={item._id}
									className='hover:bg-transparent cursor-pointer'
									onClick={() => handleRowClick(item.coordinates, dispatch)}
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
										<button
											onClick={async e => {
												e.stopPropagation()
												confirmDeleteMarker(item._id, deleteMark)
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
					{totalPages > 1 && (
						<Pagination className='mt-4'>
							<PaginationPrevious onClick={handlePreviousPage} />
							<PaginationContent>
								{Array.from({ length: totalPages }, (_, index) => (
									<PaginationItem key={index}>
										<PaginationLink
											isActive={currentPage === index + 1}
											onClick={() => setCurrentPage(index + 1)}
										>
											{index + 1}
										</PaginationLink>
									</PaginationItem>
								))}
							</PaginationContent>
							<PaginationNext onClick={handleNextPage} />
						</Pagination>
					)}
				</>
			)}
		</div>
	)
})

export default TableMarks
