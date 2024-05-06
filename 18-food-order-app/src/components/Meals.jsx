import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";

function Meals() {
	const [meals, setMeals] = useState([]);
	useEffect(() => {
		async function getMeals() {
			const result = await fetch("http://localhost:3000/meals");

			const data = await result.json();
			setMeals(data);
			return data;
		}
		getMeals();
	}, []);

	return (
		<ul id="meals">
			{meals.map((meal) => (
				<MealItem item={meal} key={meal.id} />
			))}
		</ul>
	);
}

export default Meals;
