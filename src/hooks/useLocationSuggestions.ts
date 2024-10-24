import { useState, useRef, useEffect } from 'react'
import { toast } from 'sonner' // Импортируем метод toast из Sonner
import { GeoObject, Suggestion } from '@@/types/types'

export const useLocationSuggestions = () => {
	const [suggestions, setSuggestions] = useState<Suggestion[]>([])
	const [showSuggestions, setShowSuggestions] = useState(false)
	const suggestionBoxRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				suggestionBoxRef.current &&
				!suggestionBoxRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleSearch = async (location: string) => {
		if (!location) return

		const geocoderUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=df6f472b-6669-41b7-ab25-03e411ba22f4&format=json&geocode=${encodeURIComponent(
			location
		)}`

		try {
			const res = await fetch(geocoderUrl)
			const data = await res.json()

			const results: GeoObject[] =
				data.response.GeoObjectCollection.featureMember.map(
					(item: any) => item.GeoObject
				)

			if (!results || results.length === 0) {
				toast.error('Не найдено местоположение для указанного адреса')
				return
			}

			const suggestionsList: Suggestion[] = results.map(result => ({
				name: result.name,
				coordinates: result.Point.pos.split(' ').map(Number) as [number, number]
			}))

			setSuggestions(suggestionsList)
			setShowSuggestions(true)
		} catch (error) {
			// Показываем тостер Sonner при ошибке
			toast.error('Ошибка при геокодировании')
			console.error('Ошибка при геокодировании:', error)
		}
	}

	return {
		suggestions,
		showSuggestions,
		suggestionBoxRef,
		handleSearch,
		setShowSuggestions
	}
}
