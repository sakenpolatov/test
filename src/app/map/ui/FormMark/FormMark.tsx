import React, { memo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { markFormSchema } from '@/lib/schemas'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setCoordinates } from '@/redux/slices/marksSlice'
import { addMark, fetchMarks } from '@/redux/asyncActions/marksActions'
import { IFormData, Suggestion } from '@@/types/types'
import { useLocationSuggestions } from '@/hooks/useLocationSuggestions'

import { defaultValues } from '@/constants/variables'
import Markup from './Markup'

const FormMark = memo(() => {
	const dispatch = useAppDispatch()
	const coordinates = useAppSelector(state => state.marks.coordinates)
	const {
		suggestions,
		showSuggestions,
		suggestionBoxRef,
		handleSearch,
		setShowSuggestions
	} = useLocationSuggestions()

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
		<Markup
			form={form}
			onSubmit={onSubmit}
			handleSearch={handleSearch}
			handleSelectSuggestion={handleSelectSuggestion}
			suggestions={suggestions}
			showSuggestions={showSuggestions}
			suggestionBoxRef={suggestionBoxRef}
		/>
	)
})

export default FormMark
