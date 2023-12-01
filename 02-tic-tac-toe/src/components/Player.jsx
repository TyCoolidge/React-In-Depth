import { useState } from "react";

export default function Player({ initialName, symbol }) {
	console.log("player");
	const [isEditing, setIsEditing] = useState(false);
	const [playerName, setPlayerName] = useState(initialName);

	function handleChange(event) {
		setPlayerName(event.target.value);
	}

	return (
		<li>
			<span className="player">
				{!isEditing ? (
					<span className="player-name">{playerName}</span>
				) : (
					<input
						type="text"
						required
						value={playerName}
						onChange={handleChange}
					/>
				)}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={() => setIsEditing((editing) => !editing)}>
				{!isEditing ? "Edit" : "Save"}
			</button>
		</li>
	);
}
