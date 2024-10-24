import { ICoordinates, IMarker } from '@@/types/types'
import { createSlice } from '@reduxjs/toolkit'
import { fetchMarks, deleteMark } from '../asyncActions/marksActions'

interface MarksState {
	markers: IMarker[]
	loading: boolean
	error: string | null
	coordinates: ICoordinates | null
	currentCoordinates: ICoordinates | null
}

const initialState: MarksState = {
	markers: [],
	loading: false,
	error: null,
	coordinates: null,
	currentCoordinates: null
}

const marksSlice = createSlice({
	name: 'marks',
	initialState,
	reducers: {
		setMarks: (state, action) => {
			state.markers = action.payload
		},
		setCoordinates: (state, action) => {
			state.coordinates = action.payload
		},
		setCurrentCoordinates: (state, action) => {
			state.currentCoordinates = action.payload
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

export const { setMarks, setCoordinates, setCurrentCoordinates } =
	marksSlice.actions
export default marksSlice.reducer
