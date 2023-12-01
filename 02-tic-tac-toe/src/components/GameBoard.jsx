import { useState } from "react";

const initialGameBoard = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

export default function GameBoard() {
	const [gameBoard, setGameBoard] = useState(initialGameBoard);

	function handleSelection(rowIndex, colIndex) {
		console.log(rowIndex, colIndex, value);
		setGameBoard((prevGameBoard) => {
			const updatedBoard = structuredClone(prevGameBoard); // creates deep copy; otherwise we will have to destructure the two arrays
			updatedBoard[rowIndex][colIndex] = "X";
			return updatedBoard;
		});
	}
	return (
		<ol id="game-board">
			{gameBoard.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => (
							<li key={colIndex}>
								<button onClick={() => handleSelection(rowIndex, colIndex)}>
									{playerSymbol}
								</button>
							</li>
						))}
					</ol>
				</li>
			))}
		</ol>
	);
}
