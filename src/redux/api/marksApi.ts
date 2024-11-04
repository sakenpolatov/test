import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMarker, IFormData } from '@@/types/types'

export const marksApi = createApi({
	reducerPath: 'marksApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
	tagTypes: ['Marker'],
	endpoints: builder => ({
		// Запрос для получения меток с пагинацией
		fetchMarks: builder.query<
			{ markers: IMarker[]; totalPages: number },
			{ page: number; limit: number }
		>({
			query: ({ page, limit }) => `markers?page=${page}&limit=${limit}`,
			transformResponse: (response: {
				markers: IMarker[]
				totalPages: number
			}) => response,
			providesTags: result =>
				Array.isArray(result?.markers)
					? [
							...result.markers.map(
								({ _id }) => ({ type: 'Marker', id: _id } as const)
							),
							{ type: 'Marker', id: 'LIST' }
					  ]
					: [{ type: 'Marker', id: 'LIST' }]
		}),
		// Мутация для удаления метки
		deleteMark: builder.mutation<void, string>({
			query: id => ({
				url: `markers/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: [{ type: 'Marker', id: 'LIST' }]
		}),
		// Мутация для добавления метки
		addMark: builder.mutation<IMarker, IFormData>({
			query: markerData => ({
				url: 'markers',
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: markerData
			}),
			invalidatesTags: [{ type: 'Marker', id: 'LIST' }]
		}),
		// Мутация для обновления метки
		updateMark: builder.mutation<IMarker, Partial<IMarker> & { id: string }>({
			query: ({ id, ...data }) => ({
				url: `markers/${id}`,
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: data
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'Marker', id }]
		})
	})
})

export const {
	useFetchMarksQuery,
	useDeleteMarkMutation,
	useAddMarkMutation,
	useUpdateMarkMutation
} = marksApi
