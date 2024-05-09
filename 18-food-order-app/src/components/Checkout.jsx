import React, { useContext } from "react";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import Input from "./UI/Input";

function Checkout({ open, setOpenCheckout }) {
	const { cartTotal } = useContext(CartContext);

	function handleCloseCheckout() {
		setOpenCheckout(false);
	}

	function handleSubmit(e) {
		e.preventDefault();
		// setOpenCheckout(false);
		const data = new FormData(e.target);
		console.log("🚀 ~ handleSubmit ~ data:", data);
		const customerData = Object.fromEntries(data);
		console.log("🚀 ~ handleSubmit ~ customerData:", customerData);
	}

	return (
		<Modal open={open} onClose={handleCloseCheckout}>
			<form onSubmit={handleSubmit}>
				<h2>Checkout</h2>
				<p>Total Amount: {cartTotal} </p>
				<Input label="Full Name" type="text" id="full-text" />
				<Input label="Email" type="email" id="email" />
				<Input label="Street" type="text" id="street" />
				<div className="control-row">
					<Input label="Postal code" type="text" id="postal-code" />
					<Input label="City" type="text" id="city" />
				</div>

				<p className="modal-actions">
					{/* type button since this is in a form and we dont want the close button submitting anything */}
					<Button textOnly type="button" onClick={handleCloseCheckout}>
						Close
					</Button>
					<Button>Submit Order</Button>
				</p>
			</form>
		</Modal>
	);
}

export default Checkout;
