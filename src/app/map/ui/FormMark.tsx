import React, { memo } from 'react'
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
import { FaSearchLocation } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setCoordinates } from '@/redux/slices/marksSlice'
import { addMark, fetchMarks } from '@/redux/asyncActions/marksActions'
import { IFormData } from '@@/types/types'
import { defaultValues } from '@/constants/variables'

const FormMark = () => {
	const dispatch = useAppDispatch()
	const coordinates = useAppSelector(state => state.marks.coordinates)

	const form = useForm({
		resolver: zodResolver(markFormSchema),
		defaultValues
	})

	const onSubmit = async (data: IFormData) => {
		try {
			if (
				!coordinates ||
				coordinates.latitude === null ||
				coordinates.longitude === null
			) {
				console.error('Координаты не найдены, нельзя создать метку')
				return
			}

			const markerData = {
				...data,
				coordinates: {
					latitude: coordinates.latitude,
					longitude: coordinates.longitude
				}
			}

			dispatch(addMark(markerData))
				.unwrap()
				.then(() => {
					form.reset()
					dispatch(setCoordinates({ latitude: null, longitude: null }))
					dispatch(fetchMarks())
				})
				.catch(error => {
					console.error('Ошибка при добавлении метки:', error)
				})
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

			console.log('Geocoding response:', data)

			const results = data.response.GeoObjectCollection.featureMember

			if (!results || results.length === 0) {
				console.error('Не найдено местоположение для указанного адреса')
				return
			}

			const firstResult = results[0]?.GeoObject.Point.pos.split(' ').map(Number)
			console.log('Координаты первого результата:', firstResult)

			if (firstResult && window.myMap) {
				const [longitude, latitude] = firstResult
				dispatch(setCoordinates({ latitude, longitude }))
				console.log('Координаты успешно обновлены:', { latitude, longitude })
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

export default memo(FormMark)
