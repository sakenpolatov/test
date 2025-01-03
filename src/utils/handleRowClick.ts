import { ICoordinates } from '@@/types/types'
import { AppDispatch } from '@/redux/store'
import { setCurrentCoordinates } from '@/redux/slices/marksSlice'
import { anchorToMap } from '@/utils/anchorToMap'
import { setMapCenter, setZoom } from '@/redux/slices/mapSlice'

export const handleRowClick = (
	coordinates: ICoordinates,
	dispatch: AppDispatch
) => {
	if (
		coordinates &&
		coordinates.latitude !== null &&
		coordinates.longitude !== null
	) {
		dispatch(setCurrentCoordinates(coordinates))
		dispatch(setMapCenter([coordinates.latitude, coordinates.longitude]))
		dispatch(setZoom(17))
		anchorToMap('map', 80)
	} else {
		console.error('Координаты не указаны для этой метки.')
	}
}
