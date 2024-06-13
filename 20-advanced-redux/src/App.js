import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

function App() {
	const dispatch = useDispatch();
	const showCart = useSelector((state) => state.ui.cartIsVisible);
	const notification = useSelector((state) => state.ui.notification);
	const cart = useSelector((state) => state.cart);

	useEffect(() => {
		const updateCart = async () => {
			console.log("here");
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

		if (cart.items.length > 0) {
			updateCart();
		}
	}, [cart, dispatch]);

	return (
		<Fragment>
			{notification && <Notification {...notification} />}
			<Layout>
				{showCart && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
