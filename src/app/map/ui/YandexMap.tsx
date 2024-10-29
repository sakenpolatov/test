import React, { useEffect, useCallback, useRef } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { loadYandexModules } from '@/lib/ymapsLoader'
import { setMapInitialized } from '@/redux/slices/marksSlice'
import { heatmapLoader } from '@/lib/heatmapLoader'

const YandexMap = () => {
	const { markers, currentCoordinates, isMapInitialized, loading } =
		useAppSelector(state => state.marks)
	const dispatch = useAppDispatch()
	const apiKey = process.env.NEXT_PUBLIC_YANDEX_API_KEY
	const mapRef = useRef<ymaps.Map | null>(null)
	const heatmapRef = useRef<ymaps.Heatmap | null>(null)

	const initializeMap = useCallback(async () => {
		if (
			!window.ymaps ||
			!apiKey ||
			loading ||
			isMapInitialized ||
			markers.length === 0
		) {
			console.log('Карта не будет инициализирована, пока метки не загружены.')
			return
		}

		console.log('Начата инициализация карты и тепловой карты.')

		try {
			const [Map, Placemark, Clusterer] = await loadYandexModules()
			console.log('Модули Yandex Map загружены:', { Map, Placemark, Clusterer })

			const Heatmap = await heatmapLoader()
			console.log('Модуль тепловой карты загружен:', Heatmap)

			if (!mapRef.current) {
				const centerCoordinates =
					currentCoordinates?.latitude && currentCoordinates?.longitude
						? [currentCoordinates.latitude, currentCoordinates.longitude]
						: [55.751574, 37.573856]

				mapRef.current = new Map('map', {
					center: centerCoordinates,
					zoom: 9,
					controls: ['zoomControl', 'geolocationControl']
				})
				dispatch(setMapInitialized(true))
				console.log(
					'Карта успешно инициализирована с центром:',
					centerCoordinates
				)
			}

			const addPlacemarksAndHeatmap = () => {
				if (mapRef.current && mapRef.current.geoObjects) {
					mapRef.current.geoObjects.removeAll()
					console.log('Все существующие геообъекты удалены с карты.')

					const geoObjects = markers
						.map(marker => {
							if (
								marker.coordinates?.latitude &&
								marker.coordinates?.longitude
							) {
								return new Placemark(
									[marker.coordinates.latitude, marker.coordinates.longitude],
									{ balloonContent: marker.description || '' },
									{ preset: 'islands#icon', iconColor: '#0095b6' }
								)
							}
							return null
						})
						.filter(Boolean)

					const clusterer = new Clusterer({
						preset: 'islands#invertedVioletClusterIcons',
						groupByCoordinates: false,
						zoomMargin: 25
					})

					clusterer.add(geoObjects)
					mapRef.current.geoObjects.add(clusterer)
					console.log(
						'Метки добавлены на карту и сгруппированы кластеризатором.'
					)

					const heatmapData = markers
						.map(
							marker =>
								marker.coordinates && [
									marker.coordinates.latitude,
									marker.coordinates.longitude
								]
						)
						.filter(Boolean) as [number, number][]

					if (heatmapData.length > 0 && !heatmapRef.current) {
						heatmapRef.current = new Heatmap(heatmapData, {
							radius: 25,
							opacity: 0.5,
							gradient: {
								0.1: 'rgba(0, 255, 0, 0.8)',
								0.2: 'rgba(255, 255, 0, 0.8)',
								0.5: 'rgba(255, 165, 0, 0.9)',
								1.0: 'rgba(255, 0, 0, 1.0)'
							}
						})
						if (heatmapRef.current && mapRef.current) {
							heatmapRef.current.setMap(mapRef.current)
							console.log('Тепловая карта успешно добавлена на карту.')
						}
					} else {
						console.log(
							'Данные для тепловой карты отсутствуют или карта уже инициализирована.'
						)
					}
				}
			}

			addPlacemarksAndHeatmap()
		} catch (error) {
			console.error('Ошибка при инициализации карты или тепловой карты:', error)
		}
	}, [currentCoordinates, markers, apiKey, isMapInitialized, dispatch, loading])

	useEffect(() => {
		if (
			mapRef.current &&
			currentCoordinates &&
			currentCoordinates.latitude &&
			currentCoordinates.longitude
		) {
			mapRef.current.setCenter(
				[currentCoordinates.latitude, currentCoordinates.longitude],
				17
			)
			console.log('Карта центрирована на новые координаты:', currentCoordinates)
		}
	}, [currentCoordinates])

	useEffect(() => {
		const initializeScripts = async () => {
			if (!isMapInitialized && markers.length > 0) {
				console.log('Начата загрузка скриптов Yandex.Карт.')
				const existingScript = document.querySelector(
					'script[src*="api-maps.yandex.ru"]'
				)
				if (!existingScript) {
					const yandexMapScript = document.createElement('script')
					yandexMapScript.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`
					yandexMapScript.async = true
					document.body.appendChild(yandexMapScript)

					yandexMapScript.onload = () => {
						console.log('Скрипт Yandex Maps успешно загружен.')
						const heatmapScript = document.createElement('script')
						heatmapScript.src =
							'https://yastatic.net/s3/mapsapi-jslibs/heatmap/0.0.1/heatmap.min.js'
						heatmapScript.async = true
						document.body.appendChild(heatmapScript)

						heatmapScript.onload = initializeMap
					}
				} else {
					console.log('Скрипт Yandex Maps уже загружен ранее.')
					initializeMap()
				}
			}
		}
		initializeScripts()
		return () => {
			dispatch(setMapInitialized(false))
		}
	}, [initializeMap, isMapInitialized, apiKey, markers.length])

	return <div id='map' className='w-full h-[500px] border-4 border-white'></div>
}

export default YandexMap
