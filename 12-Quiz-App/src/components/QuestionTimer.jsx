import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
	const [remainingTime, setRemainingTime] = useState(timeout);

	useEffect(() => {
		console.log("timer");
		// next test, see if timer continues if i select an option before timer is up

		const timer = setTimeout(onTimeout, timeout);

		return () => {
			clearTimeout(timer);
		};
	}, [onTimeout, timeout]);

	useEffect(() => {
		console.log("interval");
		const interval = setInterval(() => {
			setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
		}, 100);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<progress id="question-overview" value={remainingTime} max={timeout} />
	);
}
