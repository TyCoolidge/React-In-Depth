import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import ErrorComponent from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
	const [availablePlaces, setAvailablePlaces] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		async function getPlaces() {
			setLoading(true);
			try {
				const response = await fetch("http://localhost:3000/places");
				const data = await response.json();

				if (!response.ok) {
					throw new Error("Failed to fetch places");
				}

				navigator.geolocation.getCurrentPosition(
					({ coords: { latitude, longitude } }) => {
						const sortedPlaces = sortPlacesByDistance(
							data.places,
							latitude,
							longitude
						);
						setAvailablePlaces(sortedPlaces);
						setLoading(false); // need this since function is not async, calling this after try,catch will immediately happen before sorting
					},
					(error) => {
						setAvailablePlaces(data.places);
						setLoading(false);
					}
				);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		}

		getPlaces();
	}, []);

	if (error) {
		return (
			<ErrorComponent
				title={"An error occurred"}
				message={error.message || "Could not fetch places"}
			/>
		);
	}
	return (
		<Places
			title="Available Places"
			places={availablePlaces}
			isLoading={loading}
			loadingText="Fetching place data..."
			fallbackText="No places available."
			onSelectPlace={onSelectPlace}
		/>
	);
}
