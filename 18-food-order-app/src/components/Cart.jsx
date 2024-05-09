import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import CartItem from "./CartItem";

function Cart({ open, setOpenCart, setOpenCheckout }) {
	const { items, cartTotal } = useContext(CartContext);

	function handleOpenCheckout() {
		setOpenCart(false);
		setOpenCheckout(true);
	}

	function handleCloseCart() {
		setOpenCart(false);
	}

	return (
		<Modal className="cart" open={open} onClose={handleCloseCart}>
			<h2>Your Cart</h2>
			<ul>
				{items.map((item) => (
					<CartItem item={item} key={item.id} />
				))}
				<p className="cart-total">{cartTotal}</p>
				<p className="modal-actions">
					<Button textOnly onClick={handleCloseCart}>
						Close
					</Button>
					{items.length > 0 && (
						<Button onClick={handleOpenCheckout}>Go to Checkout</Button>
					)}
				</p>
			</ul>
		</Modal>
	);
}

export default Cart;
