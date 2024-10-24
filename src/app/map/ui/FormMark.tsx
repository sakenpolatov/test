import React, { useState, useEffect, useRef, memo } from 'react'
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
import { GeoObject, IFormData, Suggestion } from '@@/types/types'
import { defaultValues } from '@/constants/variables'

const FormMark = () => {
	const dispatch = useAppDispatch()
	const coordinates = useAppSelector(state => state.marks.coordinates)
	const [suggestions, setSuggestions] = useState<Suggestion[]>([])
	const [showSuggestions, setShowSuggestions] = useState(false)
	const suggestionBoxRef = useRef<HTMLDivElement | null>(null)

	const form = useForm({
		resolver: zodResolver(markFormSchema),
		defaultValues
	})

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

			const results: GeoObject[] =
				data.response.GeoObjectCollection.featureMember.map(
					(item: any) => item.GeoObject
				)

			if (!results || results.length === 0) {
				console.error('Не найдено местоположение для указанного адреса')
				return
			}

			const suggestionsList: Suggestion[] = results
				.slice(0, 10)
				.map(result => ({
					name: result.name,
					coordinates: result.Point.pos.split(' ').map(Number) as [
						number,
						number
					]
				}))

			setSuggestions(suggestionsList)
			setShowSuggestions(true)
		} catch (error) {
			console.error('Ошибка при геокодировании:', error)
		}
	}

	const handleSelectSuggestion = (suggestion: Suggestion) => {
		const [longitude, latitude] = suggestion.coordinates
		dispatch(setCoordinates({ latitude, longitude }))
		form.setValue('location', suggestion.name)
		setShowSuggestions(false)

		if (window.myMap) {
			window.myMap.setCenter([latitude, longitude], 18)
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

									{showSuggestions && suggestions.length > 0 && (
										<div
											ref={suggestionBoxRef}
											className='absolute z-10 mt-2 w-full bg-gray-600 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto'
										>
											{suggestions.map(
												(suggestion: Suggestion, index: number) => (
													<div
														key={index}
														onClick={() => handleSelectSuggestion(suggestion)}
														className='cursor-pointer p-2 hover:bg-gray-100'
													>
														{suggestion.name}
													</div>
												)
											)}
										</div>
									)}
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
