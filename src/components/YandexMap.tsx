'use client'

import React, { useEffect } from 'react'
import Script from 'next/script'
import { loadYandexModules } from '@/lib/ymapsLoader'

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
			<Script
				src={`https://api-maps.yandex.ru/2.1/?apikey=ВАШ_API_КЛЮЧ&lang=ru_RU`}
				type='text/javascript'
				onLoad={() => console.log('Yandex Maps API script loaded')}
			/>
			<div id='map' style={{ width: '100%', height: '500px' }}></div>
		</>
	)
}

export default YandexMap
