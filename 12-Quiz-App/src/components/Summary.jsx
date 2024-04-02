import React from "react";
import quizComplete from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

export default function Summary({ userAnswers }) {
	const skippedAnswers = userAnswers.filter((answer) => answer === null);
	const skippedPercent = Math.round(
		(skippedAnswers.length / userAnswers.length) * 100
	);
	const correctAnswers = userAnswers.filter(
		(answer, index) => answer === QUESTIONS[index].answers[0]
	);
	const correctPercent = Math.round(
		(correctAnswers.length / userAnswers.length) * 100
	);
	const wrongPercent = 100 - skippedPercent - correctPercent;

	return (
		<div id="summary">
			<img src={quizComplete} />
			<h2>Quiz Completed!</h2>
			<div id="summary-stats">
				<p>
					<span className="number">{skippedPercent}%</span>
					<span className="text">skipped</span>
				</p>
				<p>
					<span className="number">{correctPercent}%</span>
					<span className="text">answered correctly</span>
				</p>
				<p>
					<span className="number">{wrongPercent}%</span>
					<span className="text">answered incorrectly</span>
				</p>
			</div>
			<ol>
				{userAnswers.map((answer, index) => {
					let cssClass = "user-answer";

					if (answer === null) {
						cssClass += " skipped";
					} else if (answer === QUESTIONS[index].answers[0]) {
						cssClass += " correct";
					} else {
						cssClass += " wrong";
					}

					return (
						<li key={index}>
							<h3>{index + 1}</h3>
							<p className="question">{QUESTIONS[index].text}</p>
							<p className={cssClass}>{answer || "Skipped"}</p>
						</li>
					);
				})}
			</ol>
		</div>
	);
}
