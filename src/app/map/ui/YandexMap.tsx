import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps'
import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { setZoom, setMapCenter } from '@/redux/slices/marksSlice'
import { initialCoordinates } from '@/constants/variables'

const YandexMap = () => {
	const apiKey = process.env.NEXT_PUBLIC_YANDEX_API_KEY

	const dispatch = useAppDispatch()
	const currentCoordinates = useAppSelector(
		state => state.marks.currentCoordinates
	)
	const markers = useAppSelector(state => state.marks.markers)
	const loading = useAppSelector(state => state.marks.loading)
	const zoom = useAppSelector(state => state.marks.zoom)
	const mapCenter =
		useAppSelector(state => state.marks.mapCenter) || initialCoordinates

	useEffect(() => {
		if (
			currentCoordinates &&
			currentCoordinates.latitude !== null &&
			currentCoordinates.longitude !== null
		) {
			dispatch(
				setMapCenter([
					currentCoordinates.latitude,
					currentCoordinates.longitude
				])
			)
			dispatch(setZoom(16))
			console.log('Карта центрируется на:', currentCoordinates)
		}
	}, [currentCoordinates, dispatch])

	if (loading) return <div>Loading...</div>

	console.log('Центр карты:', mapCenter)
	console.log('Уровень зума:', zoom)

	return (
		<div className='w-full max-w-4xl mx-auto'>
			<YMaps query={{ apikey: apiKey }}>
				<Map
					key={`${mapCenter[0]}-${mapCenter[1]}`}
					state={{ center: mapCenter, zoom }}
					width='100%'
					height='500px'
				>
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
