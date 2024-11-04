import { createSlice } from '@reduxjs/toolkit'
import { initialState } from '@/constants/variables'

const marksSlice = createSlice({
	name: 'marks',
	initialState,
	reducers: {
		setCoordinates: (state, action) => {
			state.coordinates = action.payload
		},
		setCurrentCoordinates: (state, action) => {
			state.currentCoordinates = action.payload
			state.mapCenter = action.payload
		},
		setMapInitialized: (state, action) => {
			state.isMapInitialized = action.payload
		},
		setZoom: (state, action) => {
			state.zoom = action.payload
		},
		setMapCenter: (state, action) => {
			state.mapCenter = action.payload
		},
		setHoveredMarkerId: (state, action) => {
			state.hoveredMarkerId = action.payload
		},
		setIsModalOpen: (state, action) => {
			state.isModalOpen = action.payload
		},
		setSelectedMarker: (state, action) => {
			state.selectedMarker = action.payload
		},
		setIsAddingMarker: (state, action) => {
			state.isAddingMarker = action.payload
		}
	}
})

export const {
	setCoordinates,
	setCurrentCoordinates,
	setMapInitialized,
	setZoom,
	setMapCenter,
	setHoveredMarkerId,
	setIsModalOpen,
	setSelectedMarker,
	setIsAddingMarker
} = marksSlice.actions

export default marksSlice.reducer
