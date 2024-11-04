import { initialMarksState } from '@/constants/variables'
import { createSlice } from '@reduxjs/toolkit'

const marksSlice = createSlice({
	name: 'marks',
	initialState: initialMarksState,
	reducers: {
		setCoordinates: (state, action) => {
			state.coordinates = action.payload
		},
		setCurrentCoordinates: (state, action) => {
			state.currentCoordinates = action.payload
		},
		setIsModalOpen: (state, action) => {
			state.isModalOpen = action.payload
		},
		setSelectedMarker: (state, action) => {
			state.selectedMarker = action.payload
		}
	}
})

export const {
	setCoordinates,
	setCurrentCoordinates,
	setIsModalOpen,
	setSelectedMarker
} = marksSlice.actions

export default marksSlice.reducer
