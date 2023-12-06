import { useState } from "react";
import Header from "./components/Header";
import InvestmentInput from "./components/InvestmentInput";
import ResultsTable from "./components/ResultsTable";

function App() {
	const [userInput, setUserInput] = useState({
		initialInvestment: 0,
		annualInvestment: 0,
		expectedReturn: 0,
		duration: 0,
	});

	const inputIsValid = userInput.duration > -1;

	function handleChange(indentifier, newValue) {
		setUserInput((prevUserInput) => {
			return {
				...prevUserInput,
				[indentifier]: newValue,
			};
		});
	}

	return (
		<>
			<Header />
			<InvestmentInput onChange={handleChange} />
			{inputIsValid ? (
				<ResultsTable userInput={userInput} />
			) : (
				<p className="center">Please enter a duration greater than zero.</p>
			)}
		</>
	);
}

export default App;
