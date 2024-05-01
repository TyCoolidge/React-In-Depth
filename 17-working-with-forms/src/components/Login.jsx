import { useRef } from "react";

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();

	function handleSubmit(e) {
		e.preventDefault();
		// downside with refs is its not recommended to manipulate the dom unless using state
		console.log(emailRef.current.value, passwordRef.current.value);
		console.log("Submitted!");
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>

			<div className="control-row">
				<div className="control no-margin">
					<label htmlFor="email">Email</label>
					<input ref={emailRef} id="email" type="email" name="email" />
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
