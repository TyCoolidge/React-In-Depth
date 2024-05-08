import React, { useState } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import Cart from "./components/Cart";

function App() {
	const [openCart, setOpenCart] = useState(false);
	return (
		<CartContextProvider>
			<Header setOpenCart={setOpenCart} />
			<Meals />
			<Cart open={openCart} setOpenCart={setOpenCart} />
		</CartContextProvider>
	);
}

export default App;
