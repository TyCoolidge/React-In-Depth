import { createContext } from "react";

export const AnswersContext = createContext({
	answers: [],
	selectedAnswer: "",
	answerState: "",
	onSelect: () => {},
});
