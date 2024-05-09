import React, { useState } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
	const [openCart, setOpenCart] = useState(false);
	const [openCheckout, setOpenCheckout] = useState(false);
	return (
		<CartContextProvider>
			<Header setOpenCart={setOpenCart} />
			<Meals />
			<Cart
				open={openCart}
				setOpenCart={setOpenCart}
				setOpenCheckout={setOpenCheckout}
			/>
			<Checkout open={openCheckout} setOpenCheckout={setOpenCheckout} />
		</CartContextProvider>
	);
}

export default App;
