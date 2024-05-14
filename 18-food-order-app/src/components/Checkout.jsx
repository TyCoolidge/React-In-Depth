import React, { useContext, useEffect } from "react";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import useFetch from "../hooks/useFetch";

function Checkout({ open, setOpenCheckout }) {
	const { items, cartTotal, clearCart } = useContext(CartContext);
	const { error, sendRequest, loading, data } = useFetch();
	console.log("🚀 ~ Checkout ~ data:", data);
	console.log("🚀 ~ Checkout ~ loading:", loading);
	console.log("🚀 ~ Checkout ~ error:", error);

	function handleCloseCheckout() {
		setOpenCheckout(false);
	}

	function handleSubmit(e) {
		e.preventDefault();
		// setOpenCheckout(false);
		const data = new FormData(e.target);
		const customerData = Object.fromEntries(data);
		sendRequest({
			url: "http://localhost:3000/orders",
			config: {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: {
					order: {
						items,
						customer: customerData,
					},
				},
			},
		});
	}

	useEffect(() => {
		if (data.message) {
			handleCloseCheckout();
			clearCart();
		}
	}, [data]);

	return (
		<Modal open={open} onClose={handleCloseCheckout}>
			<form onSubmit={handleSubmit}>
				<h2>Checkout</h2>
				<p>Total Amount: {cartTotal} </p>
				<Input label="Full Name" type="text" id="name" />
				<Input label="Email" type="email" id="email" />
				<Input label="Street" type="text" id="street" />
				<div className="control-row">
					<Input label="Postal code" type="text" id="postal-code" />
					<Input label="City" type="text" id="city" />
				</div>

				<p className="modal-actions">
					{loading ? (
						<span>Submitting Order...</span>
					) : (
						<>
							{/* type button since this is in a form and we dont want the close button submitting anything */}
							<Button textOnly type="button" onClick={handleCloseCheckout}>
								Close
							</Button>
							<Button>Submit Order</Button>
						</>
					)}
				</p>
				{error && <h2 style={{ textAlign: "center" }}>{error}</h2>}
			</form>
		</Modal>
	);
}

export default Checkout;
