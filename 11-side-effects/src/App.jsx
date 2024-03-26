import { useEffect, useRef, useState, useCallback } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

// no need for use effect because this runs syncrounously, we can simply set this to the default value of pickedPlaces
// no need to keep in app component since we don't need to rerender this

const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map((id) =>
	AVAILABLE_PLACES.find((place) => id === place.id)
);

function App() {
	const selectedPlace = useRef();
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
	const [availablePlaces, setAvailablePlaces] = useState([]);

	// useEffect function will be executed after App component is finished executing (after jsx is returned)
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const sortedPlaces = sortPlacesByDistance(
				AVAILABLE_PLACES,
				position.coords.latitude,
				position.coords.longitude
			);

			setAvailablePlaces(sortedPlaces);
		});
	}, []);

	////////////////////////////////
	// This side effect will cause an infinite loop (when outside of useEffect) TEST WITH CONSOLE LOGGING, it rerenders the app component each time setState changes
	// navigator.geolocation.getCurrentPosition((position) => {
	// 	const sortedPlaces = sortPlacesByDistance(
	// 		AVAILABLE_PLACES,
	// 		position.coords.latitude,
	// 		position.coords.longitude
	// 	);
	// 	setAvailablePlaces(sortedPlaces);
	// });
	/////////////// ///////////////

	function handleStartRemovePlace(id) {
		setModalIsOpen(true);
		selectedPlace.current = id;
	}

	function handleStopRemovePlace() {
		setModalIsOpen(false);
	}

	function handleSelectPlace(id) {
		setPickedPlaces((prevPickedPlaces) => {
			if (prevPickedPlaces.some((place) => place.id === id)) {
				return prevPickedPlaces;
			}
			const place = AVAILABLE_PLACES.find((place) => place.id === id);
			return [place, ...prevPickedPlaces];
		});

		const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
		if (storedIds.indexOf(id) === -1) {
			localStorage.setItem(
				"selectedPlaces",
				JSON.stringify([id, ...storedIds])
			);
		}
	}

	// use useCallback when passing functions as dependecies to useEffect
	const handleRemovePlace = useCallback(function handleRemovePlace() {
		setPickedPlaces((prevPickedPlaces) =>
			prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
		);
		setModalIsOpen(false);
		const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
		localStorage.setItem(
			"selectedPlaces",
			JSON.stringify(storedIds.filter((item) => item !== selectedPlace.current))
		);
	}, []);

	return (
		<>
			<Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
				<DeleteConfirmation
					onCancel={handleStopRemovePlace}
					onConfirm={handleRemovePlace}
				/>
			</Modal>

			<header>
				<img src={logoImg} alt="Stylized globe" />
				<h1>PlacePicker</h1>
				<p>
					Create your personal collection of places you would like to visit or
					you have visited.
				</p>
			</header>
			<main>
				<Places
					title="I'd like to visit ..."
					fallbackText={"Select the places you would like to visit below."}
					places={pickedPlaces}
					onSelectPlace={handleStartRemovePlace}
				/>
				<Places
					title="Available Places"
					places={availablePlaces}
					fallbackText={"Sorting places by distance..."}
					onSelectPlace={handleSelectPlace}
				/>
			</main>
		</>
	);
}

export default App;
