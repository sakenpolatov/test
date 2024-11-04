import { IFormData, ICoordinates } from '@@/types/types'
import { AppDispatch } from '@/redux/store'
import { setMapCenter, setZoom } from '@/redux/slices/mapSlice'

export const handleMapClick = async (
	event: any,
	isAddingMarker: boolean,
	addMark: (marker: IFormData) => Promise<any>
) => {
	if (isAddingMarker) {
		const coords = event.get('coords')
		const newMarker: IFormData = {
			type: 'default',
			address: 'Новая метка',
			source: 'Метрика',
			comment: 'Описание метки',
			coordinates: {
				latitude: coords[0],
				longitude: coords[1]
			}
		}

		try {
			await addMark(newMarker)
		} catch (error) {
			console.error('Ошибка при добавлении метки:', error)
		}
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
		dispatch(setZoom(17))
	}
}
