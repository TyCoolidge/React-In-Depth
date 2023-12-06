import investmentImage from "../assets/investment-calculator-logo.png";

export default function Header() {
	return (
		<div id="header">
			<img src={investmentImage} alt="money bag" />
			<h1>Investment Calculator</h1>
		</div>
	);
}
