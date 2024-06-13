import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: { items: [], totalQuantity: 0 },
	reducers: {
		addToCart(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find(
				(item) => item.itemId === newItem.id
			);
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
			state.totalQuantity++;
		},
		removeFromCart(state, action) {
			const id = action.payload;
			const existingItem = state.items.find((item) => item.itemId === id);
			if (existingItem.quantity > 1) {
				existingItem.quantity--;
				existingItem.totalPrice -= existingItem.price;
			} else {
				state.items = state.items.filter((item) => item.itemId !== id);
			}
			state.totalQuantity--;
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;
