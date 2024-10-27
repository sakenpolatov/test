import { ICoordinates, IMarker } from '@@/types/types'
import { createSlice } from '@reduxjs/toolkit'
import { fetchMarks, deleteMark, addMark } from '../asyncActions/marksActions'

interface MarksState {
	markers: IMarker[]
	loading: boolean
	error: string | null
	coordinates: ICoordinates | null
	currentCoordinates: ICoordinates | null
	isMapInitialized: boolean
}

const initialState: MarksState = {
	markers: [],
	loading: false,
	error: null,
	coordinates: null,
	currentCoordinates: null,
	isMapInitialized: false
}

const marksSlice = createSlice({
	name: 'marks',
	initialState,
	reducers: {
		setCoordinates: (state, action) => {
			state.coordinates = action.payload
		},
		setCurrentCoordinates: (state, action) => {
			state.currentCoordinates = action.payload
		},
		setMapInitialized: (state, action) => {
			state.isMapInitialized = action.payload
		}
	},
	extraReducers: builder => {
		builder
			// Получение меток
			.addCase(fetchMarks.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchMarks.fulfilled, (state, action) => {
				state.loading = false
				state.markers = action.payload
			})
			.addCase(fetchMarks.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ошибка при загрузке меток'
			})

			// Добавление метки
			.addCase(addMark.fulfilled, (state, action) => {
				state.markers.push(action.payload)
			})

			// Удаление метки
			.addCase(deleteMark.fulfilled, (state, action) => {
				state.markers = state.markers.filter(
					(mark: IMarker) => mark._id !== action.payload
				)
			})
			.addCase(deleteMark.rejected, (state, action) => {
				state.error = action.payload as string
			})
	}
})

export const { setCoordinates, setCurrentCoordinates, setMapInitialized } =
	marksSlice.actions
export default marksSlice.reducer
