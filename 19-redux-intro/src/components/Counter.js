import { useDispatch, useSelector } from "react-redux";
import classes from "./Counter.module.css";
import { counterActions } from "../store/counter-store";
console.log("🚀 ~ counterActions:", counterActions);

const Counter = () => {
	const { counter, showCounter } = useSelector((state) => state.counterReducer);

	const dispatch = useDispatch();
	console.log("🚀 ~ Counter ~ counter:", counter);
	console.log("🚀 ~ Counter ~ showCounter:", showCounter);

	const incrementHandler = () => {
		dispatch(counterActions.increment());
	};

	const increaseHandler = () => {
		dispatch(counterActions.increase(5)); //will pass value as the following object; {payload: 4}
	};

	const decrementHandler = () => {
		dispatch(counterActions.decrement());
	};

	const toggleCounterHandler = () => {
		dispatch(counterActions.toggle());
	};

	return (
		<main className={classes.counter}>
			<h1>Redux Counter</h1>
			{showCounter && <div className={classes.value}>-- {counter} --</div>}
			<div>
				<button onClick={incrementHandler}>Increment</button>
				<button onClick={increaseHandler}>Increment by 5</button>

				<button onClick={decrementHandler}>Decrement</button>
			</div>
			<button onClick={toggleCounterHandler}>Toggle Counter</button>
		</main>
	);
};

export default Counter;
