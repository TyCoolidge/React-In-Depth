import React from "react";
import QUESTIONS from "../questions";
import { useState } from "react";

export default function Quiz() {
	const [userAnswers, setUserAnswers] = useState([]);

	const activeQuestionIndex = userAnswers.length;

	function handleSelectAnswer(selectedAnswer) {
		setUserAnswers((prevAnswers) => {
			return [...prevAnswers, selectedAnswer];
		});
	}

	return (
		<div id="quiz">
			<div id="question">
				<h2>{QUESTIONS[activeQuestionIndex].text}</h2>
				<ul id="answers">
					{QUESTIONS[activeQuestionIndex].answers.map((answer, index) => (
						<li key={answer} className="answer">
							<button onClick={() => handleSelectAnswer(answer)}>
								{answer}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
