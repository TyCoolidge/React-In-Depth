import React from "react";
import Places from "./Places.jsx";
import ErrorComponent from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import useFetch from "../hooks/useFetch.js";

async function fetchSortedPlaces() {
	const places = await fetchAvailablePlaces();
	// returning promise since customer hook awaits fetchFn
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				const sortedPlaces = sortPlacesByDistance(places, latitude, longitude);
				resolve(sortedPlaces);
			}
		),
			(error) => {
				reject(error);
			};
	});
}

// eslint-disable-next-line react/prop-types
export default function AvailablePlaces({ onSelectPlace }) {
	const {
		isFetching,
		fetchedData: availablePlaces,
		error,
	} = useFetch(fetchSortedPlaces, []);

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
			isLoading={isFetching}
			loadingText="Fetching place data..."
			fallbackText="No places available."
			onSelectPlace={onSelectPlace}
		/>
	);
}
