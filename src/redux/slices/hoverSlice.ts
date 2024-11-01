import { createSlice } from '@reduxjs/toolkit'

const hoverSlice = createSlice({
	name: 'hover',
	initialState: {
		hoveredMarkerId: null
	},
	reducers: {
		setHoveredMarkerId(state, action) {
			state.hoveredMarkerId = action.payload
		}
	}
})

export const { setHoveredMarkerId } = hoverSlice.actions
export default hoverSlice.reducer
