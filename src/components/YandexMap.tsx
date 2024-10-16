'use client'

import { useEffect } from 'react'

import { loadYandexModules } from '@/lib/ymapsLoader'
import ScriptLoader from '@/lib/scriptLoader'

const YandexMap = () => {
	useEffect(() => {
		const loadMap = async () => {
			if (window.myMap) return

			try {
				const [Map, Placemark, Clusterer, Heatmap] = await loadYandexModules()

				window.myMap = new Map('map', {
					center: [55.751574, 37.573856],
					zoom: 9
				})

				const placemark = new Placemark(
					[55.751574, 37.573856],
					{ balloonContent: 'Метка на карте' },
					{ preset: 'islands#icon', iconColor: '#0095b6' }
				)

				window.myMap.geoObjects.add(placemark)
			} catch (error) {
				console.error('Ошибка загрузки модулей Yandex.Maps:', error)
			}
		}

		if (typeof window !== 'undefined' && window.ymaps) {
			window.ymaps.ready(loadMap)
		}
	}, [])

	return (
		<>
			<ScriptLoader
				src='https://api-maps.yandex.ru/2.1/?apikey=df6f472b-6669-41b7-ab25-03e411ba22f4&lang=ru_RU'
				onLoad={() => console.log('Yandex Maps API script loaded')}
			/>
			<ScriptLoader
				src='https://yastatic.net/s3/mapsapi-jslibs/heatmap/0.0.1/heatmap.min.js'
				onLoad={() => console.log('Yandex Heatmap script loaded')}
			/>
			<div id='map' style={{ width: '100%', height: '500px' }}></div>
		</>
	)
}

export default YandexMap
