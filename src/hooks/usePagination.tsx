import { IMarker } from '@@/types/types'
import { useState } from 'react'

export const usePagination = (
	items: IMarker[],
	initialItemsPerPage: number
) => {
	const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)
	const [currentPage, setCurrentPage] = useState(1)

	const totalItems = items.length
	const totalPages = Math.ceil(totalItems / itemsPerPage)

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage)
		}
	}

	const handleNextPage = () => handlePageChange(currentPage + 1)
	const handlePreviousPage = () => handlePageChange(currentPage - 1)

	const handleItemsPerPageChange = (value: string) => {
		const newItemsPerPage = Number(value)
		setItemsPerPage(newItemsPerPage)

		if (totalItems < newItemsPerPage) {
			setCurrentPage(1)
		}
	}

	const visibleItems = items.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	return {
		itemsPerPage,
		currentPage,
		totalPages,
		setCurrentPage,
		handleNextPage,
		handlePreviousPage,
		handleItemsPerPageChange,
		visibleItems
	}
}
