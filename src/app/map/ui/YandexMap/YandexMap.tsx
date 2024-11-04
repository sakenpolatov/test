import React from 'react'
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
import {
	useFetchMarksQuery,
	useUpdateMarkMutation,
	useAddMarkMutation
} from '@/redux/api/marksApi'
import EditMarkerModal from './EditMarkerModal'
import CustomPlacemark from './CustomPlacemark'
import { IMarker } from '@@/types/types'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { handleMapClick } from './mapHandlers'
import {
	setHoveredMarkerId,
	setIsModalOpen,
	setSelectedMarker,
	setIsAddingMarker
} from '@/redux/slices/marksSlice'
import {
	ADD_MARKER,
	CANCEL,
	initialCoordinates,
	initialZoom,
	LEFT,
	RIGHT
} from '@/constants/variables'

const YandexMap = () => {
	const apiKey = process.env.NEXT_PUBLIC_YANDEX_API_KEY
	const { data: markers = [], isLoading } = useFetchMarksQuery()
	const [updateMark] = useUpdateMarkMutation()
	const [addMark] = useAddMarkMutation()
	const dispatch = useAppDispatch()

	const mapCenter =
		useAppSelector(state => state.marks.mapCenter) || initialCoordinates
	const hoveredMarkerId = useAppSelector(state => state.marks.hoveredMarkerId)
	const zoom = useAppSelector(state => state.marks.zoom) || initialZoom
	const isModalOpen = useAppSelector(state => state.marks.isModalOpen)
	const selectedMarker = useAppSelector(state => state.marks.selectedMarker)
	const isAddingMarker = useAppSelector(state => state.marks.isAddingMarker)

	const openEditModal = (marker: IMarker) => {
		dispatch(setSelectedMarker(marker))
		dispatch(setIsModalOpen(true))
	}

	const handleSave = async (updatedData: IMarker) => {
		try {
			const response = await updateMark({
				id: updatedData._id,
				...updatedData
			}).unwrap()
			console.log('Ответ сервера:', response)
			dispatch(setIsModalOpen(false))
			dispatch(setSelectedMarker(null))
		} catch (error) {
			console.error('Ошибка при обновлении метки:', error)
		}
	}

	return (
		<div id='map' className='w-full max-w-5xl mx-auto'>
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
						onClick={(event: any) =>
							handleMapClick(event, isAddingMarker, addMark)
						}
					>
						<FullscreenControl options={{ float: RIGHT }} />
						<GeolocationControl options={{ float: LEFT }} />
						<SearchControl options={{ float: LEFT }} />
						<ZoomControl options={{ position: { left: 10, top: 100 } }} />
						<Button
							options={{ maxWidth: 128 }}
							data={{ content: isAddingMarker ? CANCEL : ADD_MARKER }}
							defaultState={{ selected: isAddingMarker }}
							onClick={() => dispatch(setIsAddingMarker(!isAddingMarker))}
						/>
						<Clusterer>
							{markers.map(marker => (
								<CustomPlacemark
									key={marker._id}
									marker={marker}
									isHovered={hoveredMarkerId === marker._id}
									onMouseEnter={() => dispatch(setHoveredMarkerId(marker._id))}
									onMouseLeave={() => dispatch(setHoveredMarkerId(null))}
									onClick={() => openEditModal(marker)}
								/>
							))}
						</Clusterer>
					</Map>
				</YMaps>
			)}

			{isModalOpen && (
				<EditMarkerModal
					opened={isModalOpen}
					onClose={() => dispatch(setIsModalOpen(false))}
					markerData={selectedMarker}
					onSave={handleSave}
				/>
			)}
		</div>
	)
}

export default YandexMap
