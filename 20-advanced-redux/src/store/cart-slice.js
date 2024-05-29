import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: { items: [], totalQuantity: 0 },
	reducers: {
		addToCart(state, action) {
			const newItem = action.payload;
			console.log("🚀 ~ addToCart ~ newItem:", newItem);
			console.log({ ...state });
			const existingItem = state.items.find(
				(item) => item.itemId === newItem.id
			);
			console.log("🚀 ~ addToCart ~ existingItem:", existingItem);
			if (existingItem) {
				existingItem.quantity++;
				existingItem.totalPrice += existingItem.price;
			} else {
				state.items.push({
					itemId: newItem.id,
					price: newItem.price,
					name: newItem.title,
					quantity: 1,
					totalPrice: newItem.price,
				});
			}
		},
		removeFromCart(state, action) {
			const id = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			if (existingItem.quantity > 1) {
				existingItem.quantity--;
				existingItem.totalPrice -= existingItem.price;
			} else {
				state.items = state.items.filter((item) => item.id !== id);
			}
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;
