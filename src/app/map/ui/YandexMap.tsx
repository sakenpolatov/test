import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps'
import React from 'react'
import { useAppSelector } from '@/redux/hooks'
import { initialCoordinates } from '@/constants/variables'

const YandexMap = () => {
	const apiKey = process.env.NEXT_PUBLIC_YANDEX_API_KEY

	const markers = useAppSelector(state => state.marks.markers)
	const zoom = useAppSelector(state => state.marks.zoom)
	const mapCenter =
		useAppSelector(state => state.marks.mapCenter) || initialCoordinates

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
