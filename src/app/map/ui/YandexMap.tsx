import React, { useEffect, useCallback } from 'react'
import { useAppSelector } from '@/redux/hooks'

const YandexMap = () => {
	const { markers, currentCoordinates } = useAppSelector(state => state.marks)
	const apiKey = process.env.NEXT_PUBLIC_YANDEX_API_KEY

	const initializeMap = useCallback(() => {
		if (window.ymaps) {
			window.ymaps.ready(() => {
				try {
					if (!window.myMap) {
						const centerCoordinates =
							currentCoordinates &&
							currentCoordinates.latitude !== null &&
							currentCoordinates.longitude !== null
								? [currentCoordinates.latitude, currentCoordinates.longitude]
								: [55.751574, 37.573856]
						window.myMap = new window.ymaps.Map('map', {
							center: centerCoordinates,
							zoom: 11,
							controls: ['zoomControl', 'geolocationControl']
						})
					}
				} catch (error) {
					console.error('Ошибка при инициализации карты:', error)
				}
			})
		} else {
			console.error('Yandex Maps API не загружен.')
		}
	}, [currentCoordinates])

	useEffect(() => {
		const existingScript = document.querySelector(
			'script[src*="api-maps.yandex.ru"]'
		)
		if (!existingScript) {
			const yandexMapScript = document.createElement('script')
			yandexMapScript.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`
			yandexMapScript.async = true
			document.body.appendChild(yandexMapScript)

			yandexMapScript.onload = () => {
				initializeMap()
			}

			yandexMapScript.onerror = () => {
				console.error('Ошибка загрузки Yandex Maps API.')
			}
		} else {
			initializeMap()
		}
	}, [initializeMap])

	useEffect(() => {
		if (window.myMap && currentCoordinates) {
			if (
				currentCoordinates.latitude !== null &&
				currentCoordinates.longitude !== null
			) {
				window.myMap.setCenter(
					[currentCoordinates.latitude, currentCoordinates.longitude],
					18
				)
			} else {
				console.error('Некорректные текущие координаты:', currentCoordinates)
			}
		}
	}, [currentCoordinates])

	useEffect(() => {
		const addPlacemarks = () => {
			if (window.myMap) {
				window.myMap.geoObjects.removeAll()

				const geoObjects = markers
					.map(marker => {
						if (
							marker.coordinates &&
							marker.coordinates.latitude !== null &&
							marker.coordinates.longitude !== null
						) {
							return new window.ymaps.Placemark(
								[marker.coordinates.latitude, marker.coordinates.longitude],
								{ balloonContent: marker.description || '' },
								{ preset: 'islands#icon', iconColor: '#0095b6' }
							)
						} else {
							console.error(
								'Некорректные координаты метки:',
								marker.coordinates
							)
							return null
						}
					})
					.filter(Boolean)

				// Создание кластеризатора
				const clusterer = new window.ymaps.Clusterer({
					preset: 'islands#invertedVioletClusterIcons',
					groupByCoordinates: false,
					zoomMargin: 30
				})

				// Добавление меток в кластеризатор
				clusterer.add(geoObjects)

				// Добавление кластеризатора на карту
				window.myMap.geoObjects.add(clusterer)
			}
		}

		if (markers && markers.length > 0) {
			addPlacemarks()
		} else {
			console.warn('Метки отсутствуют или данные некорректны.')
		}
	}, [markers])

	return (
		<div
			id='map'
			style={{ width: '100%', height: '500px', border: '4px solid #ffffff' }}
		></div>
	)
}

export default YandexMap
