import { IFormData, ICoordinates } from '@@/types/types'
import { AppDispatch } from '@/redux/store'
import { addMark } from '@/redux/asyncActions/marksActions'
import { setMapCenter, setZoom } from '@/redux/slices/marksSlice'

export const handleMapClick = (
	event: any,
	isAddingMarker: boolean,
	dispatch: AppDispatch
) => {
	if (isAddingMarker) {
		const coords = event.get('coords')
		const newMarker: IFormData = {
			type: 'default',
			location: 'Новая метка',
			source: 'Метрика',
			comment: 'Описание метки',
			coordinates: {
				latitude: coords[0],
				longitude: coords[1]
			}
		}

		dispatch(addMark(newMarker))
	}
}

export const handleMarkerHoverToggle = (
	markerId: string | null,
	setHoveredMarkerId: (id: string | null) => void
) => {
	setHoveredMarkerId(markerId)
}

export const handlePlacemarkClick = (
	coordinates: ICoordinates | null,
	dispatch: AppDispatch
) => {
	if (coordinates) {
		dispatch(setMapCenter([coordinates.latitude, coordinates.longitude]))
		dispatch(setZoom(18))
	}
}
