import Input from "./Input";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation";
import useInput from "../hooks/useInput";

export default function StateLogin() {
	const {
		value: emailValue,
		hasError: emailHasError,
		handleInputChange: handleEmailChange,
		handleInputBlur: handleEmailBlur,
	} = useInput("", (value) => isEmail(value) && isNotEmpty(value));

	const {
		value: passwordValue,
		hasError: passwordHasError,
		handleInputChange: handlePasswordChange,
		handleInputBlur: handlePasswordBlur,
	} = useInput("", (value) => hasMinLength(value, 6));

	function handleSubmit(e) {
		// should validate on submit even if validating on keystrokes
		e.preventDefault();

		if (emailHasError || passwordHasError) return;
		console.log("Submitted!");
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>

			<div className="control-row">
				<Input
					label="email"
					id="email"
					name="email"
					onBlur={handleEmailBlur}
					onChange={handleEmailChange}
					value={emailValue}
					error={emailHasError && "Please enter a valid email!"}
				/>
				<Input
					label="password"
					id="password"
					name="password"
					type="password"
					onBlur={handlePasswordBlur}
					onChange={handlePasswordChange}
					value={passwordValue}
					error={passwordHasError && "Please enter a valid password!"}
				/>
			</div>

			<p className="form-actions">
				<button className="button button-flat">Reset</button>
				<button className="button">Login</button>
			</p>
		</form>
	);
}
