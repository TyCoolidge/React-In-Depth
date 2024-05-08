import React, { useContext, useState } from "react";
import Logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import Cart from "./Cart";

function Header({ setOpenCart }) {
	const { items } = useContext(CartContext);

	const totalItems = items.reduce((acc, curr) => {
		return (acc += curr.quantity);
	}, 0);
	return (
		<header id="main-header">
			<div id="title">
				<img src={Logo} alt="Order Out Logo" />
				<h1>Order Out</h1>
			</div>
			<nav>
				<Button textOnly onClick={() => setOpenCart(true)}>
					Cart ({totalItems})
				</Button>
			</nav>
		</header>
	);
}

export default Header;
