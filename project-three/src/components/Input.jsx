export default function Input({ name, keyName, onChange }) {
	return (
		<p>
			<label>{name}</label>
			<input
				type="number"
				onChange={(e) => onChange(keyName, +e.target.value)}
				required
			/>
		</p>
	);
}
