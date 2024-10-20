'use client'

import { useMarks } from '@/context/MarksContext'
import React, { useEffect } from 'react'

const YandexMap = () => {
	const { marks, currentCoordinates } = useMarks()

	useEffect(() => {
		if (window.myMap) {
			window.myMap.destroy()
			window.myMap = null
		}

		const yandexMapScript = document.createElement('script')
		yandexMapScript.src =
			'https://api-maps.yandex.ru/2.1/?apikey=df6f472b-6669-41b7-ab25-03e411ba22f4&lang=ru_RU'
		yandexMapScript.async = true

		const heatmapScript = document.createElement('script')
		heatmapScript.src =
			'https://yastatic.net/s3/mapsapi-jslibs/heatmap/0.0.1/heatmap.min.js'
		heatmapScript.async = true

		document.body.appendChild(yandexMapScript)
		document.body.appendChild(heatmapScript)

		const initializeMap = () => {
			if (window.ymaps) {
				window.ymaps.ready(() => {
					if (!window.myMap) {
						window.myMap = new window.ymaps.Map('map', {
							center: currentCoordinates[0] || [55.751574, 37.573856],
							zoom: 9,
							controls: ['zoomControl', 'geolocationControl']
						})
					}
				})
			} else {
				console.error('Yandex Maps API не загружен.')
			}
		}

		yandexMapScript.onload = () => {
			initializeMap()
		}

		heatmapScript.onload = () => {
			console.log('Yandex Heatmap script loaded')
		}

		return () => {
			if (window.myMap) {
				window.myMap.destroy()
				window.myMap = null
			}
			document.body.removeChild(yandexMapScript)
			document.body.removeChild(heatmapScript)
		}
	}, [])

	useEffect(() => {
		if (window.myMap && currentCoordinates.length) {
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
						window.myMap?.geoObjects.add(placemark)
					}
				})
			}
		}

		addPlacemarks()
	}, [marks])

	return (
		<div
			id='map'
			style={{
				width: '100%',
				height: '500px',
				border: '4px solid #ffffff'
			}}
		></div>
	)
}

export default YandexMap
