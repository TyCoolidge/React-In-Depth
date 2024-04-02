import React, { useCallback } from "react";
import QUESTIONS from "../questions";
import { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { AnswersContext } from "../store/answers-context";
import Summary from "./Summary";

export default function Quiz() {
	const [answerState, setAnswerState] = useState("");
	const [userAnswers, setUserAnswers] = useState([]);

	let timer = 10000;

	if (answerState === "answered") {
		timer = 1000;
	}

	if (answerState === "correct" || answerState === "wrong") {
		timer = 2000;
	}
	const activeQuestionIndex =
		answerState === "" ? userAnswers.length : userAnswers.length - 1;

	const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

	const handleSelectAnswer = useCallback(
		function handleSelectAnswer(selectedAnswer) {
			setAnswerState("answered");
			setUserAnswers((prevAnswers) => {
				return [...prevAnswers, selectedAnswer];
			});
			setTimeout(() => {
				if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
					setAnswerState("correct");
				} else {
					setAnswerState("wrong");
				}

				setTimeout(() => {
					setAnswerState("");
				}, 2000);
			}, 1000);
		},
		[activeQuestionIndex]
	);

	const handleSkipAnswer = useCallback(
		() => handleSelectAnswer(null),
		[handleSelectAnswer]
	);

	if (quizIsComplete) {
		return <Summary userAnswers={userAnswers} />;
	}

	const contextValue = {
		answers: QUESTIONS[activeQuestionIndex].answers,
		selectedAnswer: userAnswers[userAnswers.length - 1],
		answerState,
		onSelect: handleSelectAnswer,
	};

	return (
		<div id="quiz">
			<div id="question">
				<QuestionTimer
					key={timer}
					timeout={timer}
					onTimeout={answerState === "" ? handleSkipAnswer : null}
					mode={answerState}
				/>
				<h2>{QUESTIONS[activeQuestionIndex].text}</h2>
				<AnswersContext.Provider value={contextValue}>
					<Answers key={activeQuestionIndex} />
				</AnswersContext.Provider>
			</div>
		</div>
	);
}
