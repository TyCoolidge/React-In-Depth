import React, { useEffect, useState } from "react";

export default function useFetch() {
	let fetcher;
	const [error, setError] = useState("");
	const [data, setData] = useState("");
	const [loading, setLoading] = useState(false);

	async function sendRequest({ url, config }) {
		setLoading(true);
		try {
			if (config.method === "GET") {
				fetcher = () => fetch(url);
			} else {
				fetcher = () =>
					fetch(url, { ...config, body: JSON.stringify(config.body) });
			}
			const response = await fetcher();

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.message || "Something went wrong");
			}

			setData(result);
		} catch (err) {
			setError(err.message);
		}
		setLoading(false);
	}

	// useEffect(() => {
	// 	sendRequest();
	// }, []);

	return {
		data,
		error,
		loading,
		sendRequest,
	};

	// return (
	//   <div>useFetch</div>
	// )
}
