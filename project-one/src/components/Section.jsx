export default function Section({ title, children, ...props }) {
	return (
		// using rest on props is good for wrapper components
		<section {...props}>
			<h2>{title}</h2>
			{children}
		</section>
	);
}
