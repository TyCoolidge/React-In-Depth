import { useState } from "react";
import CoreConcept from "./components/CoreConcept";
import Header from "./components/Header/Header";
import TabButton from "./components/TabButton";
import { CORE_CONCEPTS, EXAMPLES } from "./data";

function App() {
	const [content, setContent] = useState("");
	function handleSelect(selectedButton) {
		setContent(selectedButton);
		console.log(content);
	}

	return (
		<div>
			<Header />
			<main>
				<section id="core-concepts">
					<h2>Core Concepts</h2>
					<ul>
						{CORE_CONCEPTS.map((concept, index) => (
							<CoreConcept key={index} props={concept} />
						))}
					</ul>
				</section>
				<section id="examples">
					<h2>Examples</h2>
					<menu>
						<TabButton
							isSelected={content === "components"}
							onSelect={() => handleSelect("components")}
						>
							Components
						</TabButton>
						<TabButton
							isSelected={content === "jsx"}
							onSelect={() => handleSelect("jsx")}
						>
							JSX
						</TabButton>
						<TabButton
							isSelected={content === "props"}
							onSelect={() => handleSelect("props")}
						>
							Props
						</TabButton>
						<TabButton
							isSelected={content === "state"}
							onSelect={() => handleSelect("state")}
						>
							State
						</TabButton>
					</menu>
					{content ? (
						<div id="tab-content">
							<h3>{EXAMPLES[content].title}</h3>
							<p>{EXAMPLES[content].description}</p>
							<pre>
								<code>{EXAMPLES[content].code}</code>
							</pre>
						</div>
					) : (
						<p>Please select a topic</p>
					)}
				</section>
			</main>
		</div>
	);
}

export default App;
