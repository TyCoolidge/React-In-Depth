import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
	name: "cart",
	initialState: { items: [], totalQuantity: 0 },
	reducers: {
		replaceCart(state, action) {
			state.items = action.payload.items;
			state.totalQuantity = action.payload.totalQuantity;
		},
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

export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: "pending",
				title: "Sending...",
				message: "Sending cart data!",
			})
		);
		try {
			const response = await fetch(
				"https://react-test-d46b9-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					body: JSON.stringify(cart),
				}
			);
			if (!response.ok) {
				throw new Error("There was an issue updating the cart");
			}
			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Success!",
					message: "Sent cart data successfully!",
				})
			);
		} catch (err) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Sending cart data failed!",
				})
			);
		}
	};
};

export const cartActions = cartSlice.actions;

export default cartSlice;
