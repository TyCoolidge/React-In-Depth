import { useEffect, useState } from "react";

function useFetch(fetchFn, initialValue) {
	const [isFetching, setIsFetching] = useState();
	const [error, setError] = useState();
	const [fetchedData, setFetchedData] = useState(initialValue);

	useEffect(() => {
		async function fetchData() {
			setIsFetching(true);
			try {
				const places = await fetchFn();
				if (places?.length) {
					setFetchedData(places);
				}
			} catch (err) {
				setError({ message: err.message || "Failed to fetch user places." });
			}
			setIsFetching(false);
		}

		fetchData();
	}, [fetchFn]);

	return {
		isFetching,
		fetchedData,
		setFetchedData,
		error,
	};
}

export default useFetch;
