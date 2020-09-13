import {createSlice} from "@reduxjs/toolkit";

const AuthSlice = createSlice({
	name: 'auth',
	initialState: true,
	reducers: {
		loggedIn: (state, action) => {
			return true;
		},
		loggedOut: (state, action) => {
			return false;
		},
	}
})

export const {loggedIn, loggedOut} = AuthSlice.actions;
export default AuthSlice.reducer;
