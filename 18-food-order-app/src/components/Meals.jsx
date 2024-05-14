import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useFetch from "../hooks/useFetch";

function Meals() {
	const [meals, setMeals] = useState([]);
	const { error, sendRequest, loading, data } = useFetch();
	console.log("🚀 ~ Meals ~ error:", error);

	useEffect(() => {
		if (!data) {
			sendRequest({
				url: "http://localhost:3000/meals",
				config: {
					method: "GET",
				},
			});
		} else {
			setMeals(data);
		}
	}, [data]);

	if (loading) {
		return <h2 style={{ textAlign: "center" }}>Loading Meals</h2>;
	}

	if (error) {
		return <h2 style={{ textAlign: "center" }}>{error}</h2>;
	}
	return (
		<ul id="meals">
			{meals.map((meal) => (
				<MealItem item={meal} key={meal.id} />
			))}
		</ul>
	);
}

export default Meals;
