import { createContext, useReducer } from "react";
import { currencyFormatter } from "../utils/formatting";

// don't need to set, just helps with planning and autocompletion
const CartContext = createContext({
	items: [],
	addItem: (item) => {},
	removeItem: (id) => {},
});

function cartReducer(state, action) {
	if (action.type === "ADD_ITEM") {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);

		const updatedItems = [...state.items]; // need to make new copy to not effect passed in state; ex: if we have another conditional that runs after this
		if (existingCartItemIndex > -1) {
			const existingItem = state.items[existingCartItemIndex];
			const updatedItem = {
				...existingItem,
				quantity: existingItem.quantity + 1,
			};
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems.push({ ...action.item, quantity: 1 });
		}
		return { ...state, items: updatedItems };
	}

	if (action.type === "REMOVE_ITEM") {
		//
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);

		const existingItem = state.items[existingCartItemIndex];

		const updatedItems = [...state.items];

		if (existingItem.quantity === 1) {
			updatedItems.splice(existingCartItemIndex, 1);
		} else {
			const updatedItem = {
				...existingItem,
				quantity: existingItem.quantity - 1,
			};
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		return { ...state, items: updatedItems };
	}

	return state;
}

export function CartContextProvider({ children }) {
	const [cart, dispatchCartAction] = useReducer(cartReducer, {
		items: [],
	});

	function addItem(item) {
		dispatchCartAction({
			type: "ADD_ITEM",
			item,
		});
	}

	function removeItem(id) {
		dispatchCartAction({
			type: "REMOVE_ITEM",
			id,
		});
	}

	const cartTotal = cart.items.reduce((acc, curr) => {
		return (acc += +curr.price * curr.quantity);
	}, 0);

	const cartContextValue = {
		items: cart.items,
		addItem,
		removeItem,
		cartTotal: currencyFormatter.format(cartTotal),
	};

	return (
		<CartContext.Provider value={cartContextValue}>
			{children}
		</CartContext.Provider>
	);
}

export default CartContext;
