// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counter-store";
import authSlice from "./auth-store";

const store = configureStore({
	reducer: {
		authReducer: authSlice.reducer,
		counterReducer: counterSlice.reducer,
	},
});

export default store;
