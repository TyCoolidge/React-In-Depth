export default function GameBoard({ onSelectSquare, board }) {
	// old reference
	// function handleSelection(rowIndex, colIndex) {
	// 	console.log(rowIndex, colIndex);
	// 	setGameBoard((prevGameBoard) => {
	// 		const updatedBoard = structuredClone(prevGameBoard); // creates deep copy; otherwise we will have to destructure the two arrays
	// 		updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
	// 		return updatedBoard;
	// 	});

	// 	onSelectSquare();
	// }
	return (
		<ol id="game-board">
			{board.map((row, rowIndex) => (
				<li key={rowIndex}>
					<ol>
						{row.map((playerSymbol, colIndex) => (
							<li key={colIndex}>
								<button
									onClick={() => onSelectSquare(rowIndex, colIndex)}
									disabled={playerSymbol !== null}
								>
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
