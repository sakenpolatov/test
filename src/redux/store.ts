import { configureStore } from '@reduxjs/toolkit'
import { marksApi } from './api/marksApi'
import marksReducer from './slices/marksSlice'

const store = configureStore({
	reducer: {
		[marksApi.reducerPath]: marksApi.reducer,
		marks: marksReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(marksApi.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
