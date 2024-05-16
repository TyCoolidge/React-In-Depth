// import { createStore } from "redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
	name: "counter",
	initialState: initialState,
	reducers: {
		// even though we change state here, it is immutable under the hook in RTK
		increment(state) {
			state.counter++;
		},
		increase(state, action) {
			state.counter = state.counter + action.payload;
		},
		decrement(state) {
			state.counter--;
		},
		toggle(state) {
			state.showCounter = !state.showCounter;
		},
	},
});

// // NORMAL REDUX
// const counterReducer = (state = initialState, action) => {
// 	// never mutate state in normal redux or useState
// 	if (action.type === "increment") {
// 		return { ...state, counter: state.counter + 1 };
// 	}

// 	if (action.type === "increase") {
// 		return { ...state, counter: state.counter + action.value };
// 	}

// 	if (action.type === "decrement") {
// 		return { ...state, counter: state.counter - 1 };
// 	}

// 	if (action.type === "toggle") {
// 		return { ...state, showCounter: !state.showCounter };
// 	}
// 	return state;
// };

export const counterActions = counterSlice.actions;

const store = configureStore({
	reducer: {
		counterReducer: counterSlice.reducer,
	},
});

export default store;
