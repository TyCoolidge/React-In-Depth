import { useState } from "react";

export default function StateLogin() {
	// const [enteredEmail, setEnteredEmail] = useState("");
	// const [enteredPassword, setEnteredPassword] = useState("");
	const [enteredValue, setEnteredValue] = useState({
		email: "",
		password: "",
	});

	const [didEdit, setDidEdit] = useState({
		email: false,

		password: false,
	});

	// function handleEmailChange(event) {
	// 	setEnteredEmail(event.target.value);
	// }
	// function handlePasswordChange(event) {
	// 	setEnteredPassword(event.target.value);
	// }
	console.log(enteredValue);
	console.log(didEdit);

	const emailIsInvalid = !enteredValue.email.includes("@") && didEdit.email;

	function handleInputChange(identifier, e) {
		setEnteredValue((prevValue) => {
			return {
				...prevValue,
				[identifier]: e.target.value,
			};
		});
		setDidEdit((prevValue) => {
			return {
				...prevValue,
				[identifier]: false,
			};
		});
	}

	function handleInputBlur(identifier, e) {
		setDidEdit((prevValue) => {
			return {
				...prevValue,
				[identifier]: true,
			};
		});
	}

	function handleSubmit(e) {
		// should validate on submit even if validating on keystrokes
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
						onBlur={() => handleInputBlur("email")}
						onChange={(e) => handleInputChange("email", e)}
						value={enteredValue.email}
					/>
					{emailIsInvalid && (
						<div className="control-error">
							<p>Please enter a valid email address.</p>
						</div>
					)}
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
