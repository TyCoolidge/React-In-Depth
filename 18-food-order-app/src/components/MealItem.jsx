import React from "react";

function MealItem({ item }) {
	return (
		<li className="meal-item">
			<article>
				<img src={`http://localhost:3000/${item.image}`} alt={item.name} />
				<h3>{item.name}</h3>
				<p className="meal-item-description">{item.description}</p>
				<p className="meal-item-price">${item.price}</p>
				<button className="meal-item-actions">Add to Cart</button>
			</article>
		</li>
	);
}

export default MealItem;
