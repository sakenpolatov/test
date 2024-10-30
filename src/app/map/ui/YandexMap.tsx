import {
	YMaps,
	Map,
	Placemark,
	Clusterer,
	SearchControl,
	FullscreenControl,
	GeolocationControl,
	ZoomControl,
	Button
} from '@pbe/react-yandex-maps'
import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { initialCoordinates } from '@/constants/variables'
import { addMark } from '@/redux/asyncActions/marksActions'
import { IFormData } from '@@/types/types'

const YandexMap = () => {
	const apiKey = process.env.NEXT_PUBLIC_YANDEX_API_KEY

	const markers = useAppSelector(state => state.marks.markers)
	const zoom = useAppSelector(state => state.marks.zoom)
	const mapCenter =
		useAppSelector(state => state.marks.mapCenter) || initialCoordinates

	const dispatch = useAppDispatch()
	const [isAddingMarker, setIsAddingMarker] = useState(false)

	const handleAddMarkerMode = () => {
		setIsAddingMarker(prev => !prev)
	}

	const handleMapClick = (event: any) => {
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
			setIsAddingMarker(false)
		}
	}

	return (
		<div className='w-full max-w-4xl mx-auto'>
			<YMaps query={{ apikey: apiKey }}>
				<Map
					key={`${mapCenter[0]}-${mapCenter[1]}`}
					state={{ center: mapCenter, zoom }}
					width='100%'
					height='500px'
					onClick={handleMapClick}
				>
					<FullscreenControl options={{ float: 'right' }} />
					<GeolocationControl options={{ float: 'left' }} />
					<SearchControl options={{ float: 'left' }} />
					<ZoomControl options={{ position: { left: 10, top: 100 } }} />
					<Button
						options={{ maxWidth: 128 }}
						data={{ content: isAddingMarker ? 'Отменить' : 'Добавить метку' }}
						defaultState={{ selected: isAddingMarker }}
						onClick={handleAddMarkerMode}
					/>
					<Clusterer>
						{markers.map(marker => (
							<Placemark
								key={marker._id}
								geometry={[
									marker.coordinates.latitude,
									marker.coordinates.longitude
								]}
								properties={{
									balloonContent: marker.label
								}}
							/>
						))}
					</Clusterer>
				</Map>
			</YMaps>
		</div>
	)
}

export default YandexMap
