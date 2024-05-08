import React, { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

function MealItem({ item }) {
	const { addItem } = useContext(CartContext);
	function handleAddItem() {
		addItem(item);
	}

	return (
		<li className="meal-item">
			<article>
				<img src={`http://localhost:3000/${item.image}`} alt={item.name} />
				<div>
					<h3>{item.name}</h3>
					<p className="meal-item-price">
						{currencyFormatter.format(item.price)}
					</p>
					<p className="meal-item-description">{item.description}</p>
				</div>
				<p className="meal-item-actions">
					<Button onClick={handleAddItem}>Add to Cart</Button>
				</p>
			</article>
		</li>
	);
}

export default MealItem;
