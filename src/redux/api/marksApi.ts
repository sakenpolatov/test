import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMarker, IFormData } from '@@/types/types'

export const marksApi = createApi({
	reducerPath: 'marksApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
	tagTypes: ['Marker'],
	endpoints: builder => ({
		fetchMarks: builder.query<IMarker[], void>({
			query: () => 'markers',
			transformResponse: (response: { markers: IMarker[] }) => response.markers,
			providesTags: result =>
				Array.isArray(result)
					? [
							...result.map(
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
		})
	})
})

export const { useFetchMarksQuery, useDeleteMarkMutation, useAddMarkMutation } =
	marksApi
