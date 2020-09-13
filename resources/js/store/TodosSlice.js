import {createSlice} from "@reduxjs/toolkit";

const TodosSlice = createSlice({
	name: 'todos',
	initialState: [],
	reducers: {
		refreshTodo: (state, action) => {
			return action.payload;
		},
	}
})

export const {refreshTodo} = TodosSlice.actions;
export default TodosSlice.reducer;
