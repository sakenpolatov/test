import { createAsyncThunk } from '@reduxjs/toolkit'
import { IMarker } from '@@/types/types'

export const fetchMarks = createAsyncThunk<IMarker[]>(
	'marks/fetchMarks',
	async () => {
		const response = await fetch('/api/markers')
		if (!response.ok) {
			throw new Error('Ошибка при загрузке меток')
		}
		const data = await response.json()
		return data.markers
	}
)
