// import { createStore } from "redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false };

const authSlice = createSlice({
	name: "authentication",
	initialState: initialState,
	reducers: {
		// even though we change state here, it is immutable under the hook in RTK
		login(state) {
			state.isAuthenticated = true;
		},
		logout(state) {
			state.isAuthenticated = false;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice;
