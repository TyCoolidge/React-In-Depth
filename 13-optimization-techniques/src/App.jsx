import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";

// component reevaluations do not propagate up, just down
// basically rerendering in a child component does not rerender parent
function App() {
	log("<App /> rendered");

	const [chosenCount, setChosenCount] = useState(0);

	function handleSetCount(newCount) {
		setChosenCount(newCount);
	}

	return (
		<>
			<Header />
			<main>
				<ConfigureCounter onSet={handleSetCount} />
				<Counter initialCount={chosenCount} />
				<Counter initialCount={0} />
			</main>
		</>
	);
}

export default App;
