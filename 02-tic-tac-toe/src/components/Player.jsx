import { useState } from "react";

export default function Player({
	initialName,
	symbol,
	isActive,
	onChangeName,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [playerName, setPlayerName] = useState(initialName);

	function handleChange(event) {
		setPlayerName(event.target.value);
	}

	function handleEdit() {
		setIsEditing((editing) => !editing);
		if (isEditing) {
			onChangeName(symbol, playerName);
		}
	}

	return (
		<li className={isActive === symbol ? "active" : null}>
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
			<button onClick={handleEdit}>{!isEditing ? "Edit" : "Save"}</button>
		</li>
	);
}
