import { Component } from "react";

// only possible for class based components?
export default class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = { hasError: false };
	}
	componentDidCatch(error) {
		console.log(error);
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return <p>Something went wrong!</p>;
		}
		return this.props.children;
	}
}
