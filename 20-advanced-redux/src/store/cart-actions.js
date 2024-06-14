import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				"https://react-test-d46b9-default-rtdb.firebaseio.com/cart.json"
			);
			if (!response.ok) {
				throw new Error("There was an issue fetching the cart");
			}
			const data = await response.json();
			console.log(data);
			dispatch(cartActions.replaceCart(data));
			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Success!",
					message: "Fetching cart data success!",
				})
			);
		} catch (err) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Fetching cart data failed!",
				})
			);
		}
	};
};

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
