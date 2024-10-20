'use client'

import React, { useEffect } from 'react'

const YandexMap = () => {
	useEffect(() => {
		// Если карта уже существует, уничтожаем её перед инициализацией
		if (window.myMap) {
			window.myMap.destroy()
			window.myMap = null
		}

		// Создаем скрипты для загрузки Яндекс Карт и тепловой карты
		const yandexMapScript = document.createElement('script')
		yandexMapScript.src =
			'https://api-maps.yandex.ru/2.1/?apikey=df6f472b-6669-41b7-ab25-03e411ba22f4&lang=ru_RU'
		yandexMapScript.async = true

		const heatmapScript = document.createElement('script')
		heatmapScript.src =
			'https://yastatic.net/s3/mapsapi-jslibs/heatmap/0.0.1/heatmap.min.js'
		heatmapScript.async = true

		// Добавляем скрипты на страницу
		document.body.appendChild(yandexMapScript)
		document.body.appendChild(heatmapScript)

		// Инициализация карты
		const initializeMap = () => {
			if (window.ymaps) {
				window.ymaps.ready(() => {
					if (!window.myMap) {
						window.myMap = new window.ymaps.Map('map', {
							center: [55.751574, 37.573856],
							zoom: 9,
							controls: ['zoomControl', 'geolocationControl']
						})

						const placemark = new window.ymaps.Placemark(
							[55.751574, 37.573856],
							{ balloonContent: 'Метка на карте' },
							{ preset: 'islands#icon', iconColor: '#0095b6' }
						)

						if (window.myMap) {
							window.myMap.geoObjects.add(placemark)
						}
					}
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
			if (window.myMap) {
				window.myMap.destroy()
				window.myMap = null
			}
			document.body.removeChild(yandexMapScript)
			document.body.removeChild(heatmapScript)
		}
	}, [])

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
