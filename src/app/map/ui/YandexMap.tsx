import React, { useEffect, useCallback } from 'react'
import { useMarks } from '@/context/MarksContext'

const YandexMap = () => {
	const { marks, currentCoordinates } = useMarks()

	const initializeMap = useCallback(() => {
		if (window.ymaps) {
			window.ymaps.ready(() => {
				try {
					if (!window.myMap) {
						window.myMap = new window.ymaps.Map('map', {
							center: currentCoordinates[0] || [55.751574, 37.573856],
							zoom: 9,
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
			yandexMapScript.src =
				'https://api-maps.yandex.ru/2.1/?apikey=df6f472b-6669-41b7-ab25-03e411ba22f4&lang=ru_RU'
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
		if (window.myMap && currentCoordinates.length > 0) {
			window.myMap.setCenter(
				[currentCoordinates[0].latitude, currentCoordinates[0].longitude],
				9
			)
		}
	}, [currentCoordinates])

	useEffect(() => {
		const addPlacemarks = () => {
			if (window.myMap) {
				window.myMap.geoObjects.removeAll()

				marks.forEach(marker => {
					if (marker.coordinates) {
						const placemark = new window.ymaps.Placemark(
							[marker.coordinates.latitude, marker.coordinates.longitude],
							{ balloonContent: marker.description || '' },
							{ preset: 'islands#icon', iconColor: '#0095b6' }
						)

						if (window.myMap) {
							window.myMap.geoObjects.add(placemark)
						} else {
							console.error(
								'Карта не инициализирована, не удается добавить метку.'
							)
						}
					}
				})
			}
		}

		addPlacemarks()
	}, [marks])

	return (
		<div
			id='map'
			style={{ width: '100%', height: '500px', border: '4px solid #ffffff' }}
		></div>
	)
}

export default YandexMap
