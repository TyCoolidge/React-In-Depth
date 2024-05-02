import { useRef, useState } from "react";

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [emailIsInvalid, setEmailIsInvalid] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		// downside with refs is its not recommended to manipulate the dom unless using state
		console.log(emailRef.current.value, passwordRef.current.value);
		console.log("Submitted!");

		const emailIsValid = emailRef.current.value.includes("@");

		if (!emailIsValid) {
			setEmailIsInvalid(true);
			return;
		}

		setEmailIsInvalid(false);

		console.log("Sending HTTP request...");
	}

	return (
		<form onSubmit={handleSubmit} noValidate>
			<h2>Login</h2>

			<div className="control-row">
				<div className="control no-margin">
					<label htmlFor="email">Email</label>
					<input ref={emailRef} id="email" type="email" name="email" />
					{emailIsInvalid && (
						<div className="control-error">
							<p>Please enter a valid email address.</p>
						</div>
					)}
				</div>

				<div className="control no-margin">
					<label htmlFor="password">Password</label>
					<input
						ref={passwordRef}
						id="password"
						type="password"
						name="password"
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
