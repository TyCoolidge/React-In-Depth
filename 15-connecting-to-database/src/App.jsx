import React, { useRef, useState, useCallback } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { deleteUserPlace, fetchUserPlaces, updateUserPlaces } from "./http.js";
import ErrorComponent from "./components/Error.jsx";
import useFetch from "./hooks/useFetch.js";

function App() {
	const selectedPlace = useRef();

	// const [userPlaces, setUserPlaces] = useState([]);
	const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState(null);

	const [modalIsOpen, setModalIsOpen] = useState(false);

	const {
		isFetching,
		fetchedData: userPlaces,
		setFetchedData,
		error,
	} = useFetch(fetchUserPlaces, []);

	function handleStartRemovePlace(place) {
		setModalIsOpen(true);
		selectedPlace.current = place;
	}

	function handleStopRemovePlace() {
		setModalIsOpen(false);
	}

	async function handleSelectPlace(selectedPlace) {
		setFetchedData((prevPickedPlaces) => {
			if (!prevPickedPlaces) {
				prevPickedPlaces = [];
			}
			if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
				return prevPickedPlaces;
			}
			return [selectedPlace, ...prevPickedPlaces];
		});

		try {
			await updateUserPlaces([selectedPlace, ...userPlaces]);
		} catch (err) {
			setFetchedData(userPlaces);
			setErrorUpdatingPlaces({
				message: err.message || "Failed to update places.",
			});
		}
	}

	const handleRemovePlace = useCallback(
		async function handleRemovePlace() {
			setFetchedData((prevPickedPlaces) =>
				prevPickedPlaces.filter(
					(place) => place.id !== selectedPlace.current.id
				)
			);

			try {
				await deleteUserPlace(selectedPlace.current.id);
			} catch (err) {
				// sets back to previous places before line 50 takes affect
				setFetchedData(userPlaces);
				setErrorUpdatingPlaces({
					message: err.message || "Failed to update places.",
				});
			}

			setModalIsOpen(false);
		},
		[userPlaces, setFetchedData]
	);

	function handleError() {
		setErrorUpdatingPlaces(null);
	}

	return (
		<>
			<Modal open={errorUpdatingPlaces} onClose={handleError}>
				{/* need this check because Modal will always be on DOM even if its closed */}
				{errorUpdatingPlaces && (
					<ErrorComponent
						title="An error occurred!"
						message={errorUpdatingPlaces.message}
						onConfirm={handleError}
					/>
				)}
			</Modal>

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
				{error && (
					<ErrorComponent title="An error occurred!" message={error.message} />
				)}
				{!error && (
					<Places
						title="I'd like to visit ..."
						fallbackText="Select the places you would like to visit below."
						isLoading={isFetching}
						loadingText="Fetching your places..."
						places={userPlaces}
						onSelectPlace={handleStartRemovePlace}
					/>
				)}

				<AvailablePlaces onSelectPlace={handleSelectPlace} />
			</main>
		</>
	);
}

export default App;
