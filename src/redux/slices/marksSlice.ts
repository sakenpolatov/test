import { createSlice } from '@reduxjs/toolkit'
import { ICoordinates } from '@@/types/types'

interface MarksState {
	coordinates: ICoordinates | null
	currentCoordinates: ICoordinates | null
	isMapInitialized: boolean
	zoom: number
	mapCenter: [number, number] | null
}

const initialState: MarksState = {
	coordinates: null,
	currentCoordinates: null,
	isMapInitialized: false,
	zoom: 9,
	mapCenter: null
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
		}
	}
})

export const {
	setCoordinates,
	setCurrentCoordinates,
	setMapInitialized,
	setZoom,
	setMapCenter
} = marksSlice.actions
export default marksSlice.reducer
