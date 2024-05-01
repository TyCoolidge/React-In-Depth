import { useState } from "react";

export default function StateLogin() {
	// const [enteredEmail, setEnteredEmail] = useState("");
	// const [enteredPassword, setEnteredPassword] = useState("");
	const [enteredValue, setEnteredValue] = useState({
		email: "",
		password: "",
	});

	// function handleEmailChange(event) {
	// 	setEnteredEmail(event.target.value);
	// }
	// function handlePasswordChange(event) {
	// 	setEnteredPassword(event.target.value);
	// }

	function handleInputChange(identifier, e) {
		setEnteredValue((prevValue) => {
			return {
				...prevValue,
				[identifier]: e.target.value,
			};
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log({ enteredValue });
		console.log("Submitted!");
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>

			<div className="control-row">
				<div className="control no-margin">
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						name="email"
						onChange={(e) => handleInputChange("email", e)}
						value={enteredValue.email}
					/>
				</div>

				<div className="control no-margin">
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						name="password"
						onChange={(e) => handleInputChange("password", e)}
						value={enteredValue.password}
					/>
				</div>
			</div>

			<p className="form-actions">
				<button className="button button-flat">Reset</button>
				<button className="button">Login</button>
			</p>
		</form>
	);
}
