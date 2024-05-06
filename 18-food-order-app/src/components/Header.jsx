import React from "react";
import Logo from "../assets/logo.jpg";

function Header() {
	return (
		<header id="main-header">
			<div id="title">
				<img src={Logo} alt="Order Out Logo" />
				<h1>Order Out</h1>
			</div>
			<nav>
				<button>Cart (0)</button>
			</nav>
		</header>
	);
}

export default Header;
