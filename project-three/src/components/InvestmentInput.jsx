import Input from "./Input";

export default function InvestmentInput({ onChange }) {
	return (
		<div id="user-input">
			<div className="input-group">
				<Input
					name="Initial Investment"
					keyName="initialInvestment"
					onChange={onChange}
				/>
				<Input
					name="Annual Investment"
					keyName="annualInvestment"
					onChange={onChange}
				/>
			</div>
			<div className="input-group">
				<Input
					name="Expected Return"
					keyName="expectedReturn"
					onChange={onChange}
				/>
				<Input name="Duration" keyName="duration" onChange={onChange} />
			</div>
		</div>
	);
}
