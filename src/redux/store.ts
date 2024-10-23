import { configureStore } from '@reduxjs/toolkit'
import marksReducer from './slices/marksSlice'

const store = configureStore({
	reducer: {
		marks: marksReducer
	}
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
