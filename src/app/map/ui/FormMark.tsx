import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { markFormSchema } from '@/lib/schemas'
import { useMarks } from '@/context/MarksContext'
import { FaSearchLocation } from 'react-icons/fa'

const FormMark = () => {
	const { setMarks } = useMarks()

	const form = useForm({
		resolver: zodResolver(markFormSchema),
		defaultValues: {
			type: '',
			location: '',
			source: '',
			comment: ''
		}
	})

	const onSubmit = async (data: any) => {
		try {
			// Получаем координаты через Яндекс Геокодер
			const geocoderUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=df6f472b-6669-41b7-ab25-03e411ba22f4&format=json&geocode=${encodeURIComponent(
				data.location
			)}`

			const geocodeRes = await fetch(geocoderUrl)
			const geocodeData = await geocodeRes.json()
			const results = geocodeData.response.GeoObjectCollection.featureMember

			if (results && results.length > 0) {
				// Координаты первой найденной точки
				const firstResult = results[0]?.GeoObject.Point.pos
					.split(' ')
					.map(Number)
				console.log('Координаты для новой метки:', firstResult)

				// Проверяем, что координаты получены
				if (firstResult) {
					// Добавляем координаты в данные метки перед отправкой на сервер
					const [longitude, latitude] = firstResult
					const markerData = {
						...data,
						coordinates: {
							longitude,
							latitude
						}
					}

					// Отправляем данные на сервер
					const res = await fetch('/api/markers', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(markerData) // Отправляем данные с координатами
					})

					if (res.ok) {
						const result = await res.json()
						console.log('Метка успешно добавлена:', result)
						setMarks(prevMarks => [...prevMarks, result.marker])

						// Устанавливаем центр карты на координаты новой метки и устанавливаем зум на 18
						if (window.myMap) {
							window.myMap.setCenter(firstResult, 18)

							// Добавляем метку на карту
							const placemark = new window.ymaps.Placemark(
								firstResult,
								{
									balloonContent: data.comment // Название или описание метки
								},
								{ preset: 'islands#icon', iconColor: '#0095b6' }
							)
							window.myMap.geoObjects.add(placemark)
						}

						// Сбрасываем форму после успешного добавления
						form.reset()
					} else {
						console.error('Ошибка при добавлении метки:', res)
					}
				}
			} else {
				console.error('Не найдено местоположение для указанного адреса')
			}
		} catch (error) {
			console.error('Ошибка:', error)
		}
	}

	const handleSearch = async () => {
		const location = form.getValues('location')
		if (!location) return

		const geocoderUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=df6f472b-6669-41b7-ab25-03e411ba22f4&format=json&geocode=${encodeURIComponent(
			location
		)}`

		try {
			const res = await fetch(geocoderUrl)
			const data = await res.json()

			// Логируем данные для отладки
			console.log('Geocoding response:', data)

			const results = data.response.GeoObjectCollection.featureMember

			// Если результат отсутствует, логируем ошибку
			if (!results || results.length === 0) {
				console.error('Не найдено местоположение для указанного адреса')
				return
			}

			// Получаем координаты и преобразуем их
			const firstResult = results[0]?.GeoObject.Point.pos.split(' ').map(Number)
			console.log('Координаты первого результата:', firstResult)

			// Устанавливаем центр карты на найденное местоположение с зумом 18
			if (firstResult && window.myMap) {
				const [longitude, latitude] = firstResult
				window.myMap.setCenter([latitude, longitude], 18)
			}
		} catch (error) {
			console.error('Ошибка при геокодировании:', error)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4 max-w-md mx-auto p-6 border-2 border-gray-300 shadow-lg rounded-md'
			>
				<FormField
					control={form.control}
					name='type'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Тип</FormLabel>
							<FormControl>
								<Input {...field} placeholder='Укажите тип' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='location'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Локация</FormLabel>
							<FormControl>
								<div className='relative'>
									<Input
										{...field}
										placeholder='Укажите локацию'
										className='pr-10'
									/>
									<button
										type='button'
										onClick={handleSearch}
										className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600'
									>
										<FaSearchLocation />
									</button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='source'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Источник информации</FormLabel>
							<FormControl>
								<Input {...field} placeholder='Укажите источник' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='comment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Комментарий</FormLabel>
							<FormControl>
								<textarea
									{...field}
									placeholder='Введите комментарий'
									className='w-full border rounded-md px-3 py-2 resize-none'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					className='w-full bg-gray-600 text-white py-2 px-4 hover:text-black'
				>
					Создать
				</Button>
			</form>
		</Form>
	)
}

export default FormMark
