import React from "react";
import Logo from "../assets/logo.jpg";
import Button from "./Button";

function Header() {
	return (
		<header id="main-header">
			<div id="title">
				<img src={Logo} alt="Order Out Logo" />
				<h1>Order Out</h1>
			</div>
			<nav>
				<Button textOnly>Cart (0)</Button>
			</nav>
		</header>
	);
}

export default Header;
