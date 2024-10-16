'use client'

import React, { useEffect } from 'react'

const YandexMap = () => {
	useEffect(() => {
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
					const myMap = new window.ymaps.Map('map', {
						center: [55.751574, 37.573856],
						zoom: 9
					})

					const placemark = new window.ymaps.Placemark(
						[55.751574, 37.573856],
						{ balloonContent: 'Метка на карте' },
						{ preset: 'islands#icon', iconColor: '#0095b6' }
					)

					myMap.geoObjects.add(placemark)
					console.log('Карта успешно загружена')
				})
			} else {
				console.error('Yandex Maps API не загружен.')
			}
		}

		yandexMapScript.onload = () => {
			console.log('Yandex Maps API script loaded')
			initializeMap()
		}

		heatmapScript.onload = () => {
			console.log('Yandex Heatmap script loaded')
		}

		return () => {
			document.body.removeChild(yandexMapScript)
			document.body.removeChild(heatmapScript)
		}
	}, [])

	return <div id='map' style={{ width: '100%', height: '500px' }}></div>
}

export default YandexMap
