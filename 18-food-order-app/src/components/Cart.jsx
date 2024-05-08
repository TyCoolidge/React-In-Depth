import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import { currencyFormatter } from "../utils/formatting";

function Cart({ open, setOpenCart }) {
	const { items } = useContext(CartContext);

	const cartTotal = items.reduce((acc, curr) => {
		return (acc += +curr.price * curr.quantity);
	}, 0);

	return (
		<Modal className="cart" open={open}>
			<h2>Your Cart</h2>
			<ul>
				{items.map((item) => (
					<li className="cart-item" key={item.id}>
						<p>
							{item.name} - {item.quantity}
						</p>
						<div className="cart-item-actions">
							<Button>Remove</Button>
						</div>
					</li>
				))}
				<p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
				<p className="modal-actions">
					<Button textOnly onClick={() => setOpenCart(false)}>
						Close
					</Button>
					<Button onClick={() => setOpenCart(false)}>Go to Checkout</Button>
				</p>
			</ul>
		</Modal>
	);
}

export default Cart;
