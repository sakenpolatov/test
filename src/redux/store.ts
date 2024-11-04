import { configureStore } from '@reduxjs/toolkit'
import { marksApi } from './api/marksApi'
import marksReducer from './slices/marksSlice'
import mapReducer from './slices/mapSlice'
import paginationReducer from './slices/paginationSlice'

const store = configureStore({
	reducer: {
		[marksApi.reducerPath]: marksApi.reducer,
		marks: marksReducer,
		map: mapReducer,
		pagination: paginationReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(marksApi.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
