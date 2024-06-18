import React from "react";
import NavBar from "../components/NavBar";

function ErrorPage() {
	return (
		<>
			<NavBar />
			<main>
				<h1>An error occured!</h1>
				<p>Could not find this page!</p>
			</main>
		</>
	);
}

export default ErrorPage;
