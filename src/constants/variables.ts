import { MapState, MarksState } from '@@/types/types'

export const defaultValues = {
	type: '',
	location: '',
	source: '',
	comment: ''
}

export const initialItemsPerPage = 50
export const initialZoom = 10
export const initialCoordinates: [number, number] = [55.751574, 37.573856]

export const initialMarksState: MarksState = {
	coordinates: null,
	currentCoordinates: null,
	isModalOpen: false,
	selectedMarker: null
}

export const initialMapState: MapState = {
	isMapInitialized: false,
	zoom: 9,
	mapCenter: null,
	hoveredMarkerId: null,
	isAddingMarker: false
}

export const CANCEL = 'Отменить'

export const ADD_MARKER = 'Добавить метку'

export const RIGHT = 'right'
export const LEFT = 'left'
