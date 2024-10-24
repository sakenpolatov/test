import React from 'react'
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FaSearchLocation } from 'react-icons/fa'
import SuggestionList from '@/components/SuggestionList'
import { IFormData, Suggestion } from '@@/types/types'

interface MarkupProps {
	form: any
	onSubmit: (data: IFormData) => void
	handleSearch: (location: string) => void
	handleSelectSuggestion: (suggestion: Suggestion) => void
	suggestions: Suggestion[]
	showSuggestions: boolean
	suggestionBoxRef: React.RefObject<HTMLDivElement>
}

const Markup: React.FC<MarkupProps> = ({
	form,
	onSubmit,
	handleSearch,
	handleSelectSuggestion,
	suggestions,
	showSuggestions,
	suggestionBoxRef
}) => {
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
										onClick={() => handleSearch(field.value)}
										className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600'
									>
										<FaSearchLocation />
									</button>

									{showSuggestions && suggestions.length > 0 && (
										<SuggestionList
											suggestions={suggestions}
											onSelect={handleSelectSuggestion}
											suggestionBoxRef={suggestionBoxRef}
										/>
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

export default Markup
