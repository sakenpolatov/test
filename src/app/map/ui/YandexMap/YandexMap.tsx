import React, { useState, FC } from 'react'
import {
	YMaps,
	Map,
	Clusterer,
	SearchControl,
	FullscreenControl,
	GeolocationControl,
	ZoomControl,
	Button
} from '@pbe/react-yandex-maps'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { initialCoordinates } from '@/constants/variables'
import CustomPlacemark from './CustomPlacemark'
import {
	handleMapClick,
	handleMarkerHoverToggle,
	handlePlacemarkClick
} from './mapHandlers'
import { CustomMapMouseEvent } from '@@/types/types'
import { useFetchMarksQuery, useAddMarkMutation } from '@/redux/api/marksApi'

const YandexMap: FC = () => {
	const apiKey = process.env.NEXT_PUBLIC_YANDEX_API_KEY

	const { data: markers = [], isLoading } = useFetchMarksQuery()
	const [addMark] = useAddMarkMutation()
	const zoom = useAppSelector(state => state.marks.zoom)
	const mapCenter =
		useAppSelector(state => state.marks.mapCenter) || initialCoordinates

	const dispatch = useAppDispatch()
	const [isAddingMarker, setIsAddingMarker] = useState(false)
	const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null)

	return (
		<div id='map' className='w-full max-w-4xl mx-auto'>
			{isLoading ? (
				<div className='flex justify-center items-center h-96'>
					<p>Загрузка меток...</p>
				</div>
			) : (
				<YMaps query={{ apikey: apiKey }}>
					<Map
						key={`${mapCenter[0]}-${mapCenter[1]}`}
						state={{ center: mapCenter, zoom }}
						width='100%'
						height='500px'
						onClick={(event: CustomMapMouseEvent) =>
							handleMapClick(event, isAddingMarker, addMark)
						}
					>
						<FullscreenControl options={{ float: 'right' }} />
						<GeolocationControl options={{ float: 'left' }} />
						<SearchControl options={{ float: 'left' }} />
						<ZoomControl options={{ position: { left: 10, top: 100 } }} />
						<Button
							options={{ maxWidth: 128 }}
							data={{ content: isAddingMarker ? 'Отменить' : 'Добавить метку' }}
							defaultState={{ selected: isAddingMarker }}
							onClick={() => setIsAddingMarker(prev => !prev)}
						/>
						<Clusterer>
							{markers.map(marker => (
								<CustomPlacemark
									key={marker._id}
									marker={marker}
									isHovered={hoveredMarkerId === marker._id}
									onMouseEnter={() =>
										handleMarkerHoverToggle(marker._id, setHoveredMarkerId)
									}
									onMouseLeave={() =>
										handleMarkerHoverToggle(null, setHoveredMarkerId)
									}
									onClick={() =>
										handlePlacemarkClick(marker.coordinates, dispatch)
									}
								/>
							))}
						</Clusterer>
					</Map>
				</YMaps>
			)}
		</div>
	)
}

export default YandexMap
