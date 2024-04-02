import React, { useCallback } from "react";
import QUESTIONS from "../questions";
import { useState } from "react";
import quizComplete from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { AnswersContext } from "../store/answers-context";

export default function Quiz() {
	const [answerState, setAnswerState] = useState("");
	const [userAnswers, setUserAnswers] = useState([]);

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
		return (
			<div id="summary">
				<img src={quizComplete} />
				<h2>Quiz Completed!</h2>
			</div>
		);
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
					key={activeQuestionIndex}
					timeout={10000}
					onTimeout={handleSkipAnswer}
				/>
				<h2>{QUESTIONS[activeQuestionIndex].text}</h2>
				<AnswersContext.Provider value={contextValue}>
					<Answers key={activeQuestionIndex} />
				</AnswersContext.Provider>
			</div>
		</div>
	);
}
