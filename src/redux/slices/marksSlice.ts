import { ICoordinates, IMarker } from '@@/types/types'
import { createSlice } from '@reduxjs/toolkit'
import { fetchMarks } from '../asyncActions/marksActions'

interface MarksState {
	marks: IMarker[]
	loading: boolean
	error: string | null
	coordinates: ICoordinates | null
	currentCoordinates: ICoordinates | null
}

const initialState: MarksState = {
	marks: [],
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
			state.marks = action.payload
		},
		handleDelete: (state, action) => {
			state.marks = state.marks.filter(
				(mark: IMarker) => mark._id !== action.payload
			)
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
			.addCase(fetchMarks.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchMarks.fulfilled, (state, action) => {
				state.loading = false
				state.marks = action.payload
			})
			.addCase(fetchMarks.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Ошибка при загрузке меток'
			})
	}
})

export const { setMarks, handleDelete, setCoordinates, setCurrentCoordinates } =
	marksSlice.actions
export default marksSlice.reducer
