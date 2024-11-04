import { createSlice } from '@reduxjs/toolkit'
import { initialMapState } from '@/constants/variables'

const mapSlice = createSlice({
	name: 'map',
	initialState: initialMapState,
	reducers: {
		setMapInitialized: (state, action) => {
			state.isMapInitialized = action.payload
		},
		setZoom: (state, action) => {
			state.zoom = action.payload
		},
		setMapCenter: (state, action) => {
			state.mapCenter = action.payload
		},
		setIsAddingMarker: (state, action) => {
			state.isAddingMarker = action.payload
		},
		setHoveredMarkerId: (state, action) => {
			state.hoveredMarkerId = action.payload
		}
	}
})

export const {
	setMapInitialized,
	setZoom,
	setMapCenter,
	setIsAddingMarker,
	setHoveredMarkerId
} = mapSlice.actions

export default mapSlice.reducer
