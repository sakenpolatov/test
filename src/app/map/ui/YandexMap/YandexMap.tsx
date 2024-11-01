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
import { useFetchMarksQuery, useUpdateMarkMutation } from '@/redux/api/marksApi'
import EditMarkerModal from './EditMarkerModal'
import CustomPlacemark from './CustomPlacemark'
import { IMarker } from '@@/types/types'
import { useAppSelector } from '@/redux/hooks'

const YandexMap: FC = () => {
	const apiKey = process.env.NEXT_PUBLIC_YANDEX_API_KEY
	const { data: markers = [], isLoading } = useFetchMarksQuery()
	const [updateMark] = useUpdateMarkMutation()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedMarker, setSelectedMarker] = useState<IMarker | null>(null)
	const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null)
	const mapCenter = useAppSelector(state => state.marks.mapCenter) || [
		55.751244, 37.618423
	]
	const zoom = useAppSelector(state => state.marks.zoom) || 10

	const openEditModal = (marker: IMarker) => {
		setSelectedMarker(marker)
		setIsModalOpen(true)
	}

	const handleSave = async (updatedData: IMarker) => {
		try {
			const response = await updateMark({
				id: updatedData._id,
				...updatedData
			}).unwrap()
			console.log('Ответ сервера:', response)
			closeEditModal()
		} catch (error) {
			console.error('Ошибка при обновлении метки:', error)
		}
	}

	const closeEditModal = () => {
		setIsModalOpen(false)
		setSelectedMarker(null)
	}

	return (
		<div id='map' className='w-full max-w-4xl mx-auto'>
			{isLoading ? (
				<div className='flex justify-center items-center h-96'>
					<p>Загрузка меток...</p>
				</div>
			) : (
				<YMaps query={{ apikey: apiKey }}>
					<Map state={{ center: mapCenter, zoom }} width='100%' height='500px'>
						<FullscreenControl options={{ float: 'right' }} />
						<GeolocationControl options={{ float: 'left' }} />
						<SearchControl options={{ float: 'left' }} />
						<ZoomControl options={{ position: { left: 10, top: 100 } }} />
						<Button
							options={{ maxWidth: 128 }}
							data={{ content: 'Добавить метку' }}
							onClick={() => alert('Добавление метки')}
						/>
						<Clusterer>
							{markers.map(marker => (
								<CustomPlacemark
									key={marker._id}
									marker={marker}
									isHovered={hoveredMarkerId === marker._id}
									onMouseEnter={() => setHoveredMarkerId(marker._id)}
									onMouseLeave={() => setHoveredMarkerId(null)}
									onClick={() => openEditModal(marker)}
								/>
							))}
						</Clusterer>
					</Map>
				</YMaps>
			)}

			{selectedMarker && (
				<EditMarkerModal
					opened={isModalOpen}
					onClose={closeEditModal}
					markerData={selectedMarker}
					onSave={handleSave}
				/>
			)}
		</div>
	)
}

export default YandexMap
