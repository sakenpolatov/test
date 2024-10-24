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

export const deleteMark = createAsyncThunk(
	'marks/deleteMark',
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await fetch(`/api/markers/${id}`, {
				method: 'DELETE'
			})
			if (!response.ok) {
				throw new Error('Ошибка при удалении метки с сервера')
			}
			return id
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Произошла неизвестная ошибка')
		}
	}
)
