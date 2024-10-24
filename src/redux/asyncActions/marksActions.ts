import { createAsyncThunk } from '@reduxjs/toolkit'
import { IMarker, IFormData } from '@@/types/types'

// Получение меток с mongodb
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

// удаление метки
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

// добавление метки
export const addMark = createAsyncThunk(
	'marks/addMark',
	async (markerData: IFormData, { rejectWithValue }) => {
		try {
			const response = await fetch('/api/markers', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(markerData)
			})

			if (!response.ok) {
				throw new Error('Ошибка при добавлении метки')
			}

			const data = await response.json()
			return data.marker
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message)
			}
			return rejectWithValue('Произошла неизвестная ошибка')
		}
	}
)
