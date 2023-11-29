import { useState } from "react";
import { EXAMPLES } from "../data";
import TabButton from "./TabButton";
import Section from "./Section";
import Tabs from "./Tabs";

export default function Examples() {
	const [content, setContent] = useState("");
	function handleSelect(selectedButton) {
		setContent(selectedButton);
		console.log(content);
	}

	function tabContent() {
		return (
			<>
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
			</>
		);
	}

	return (
		<Section id="examples" title="Examples">
			<Tabs
				buttons={
					<>
						<TabButton
							isSelected={content === "components"}
							onClick={() => handleSelect("components")}
						>
							Components
						</TabButton>
						<TabButton
							isSelected={content === "jsx"}
							onClick={() => handleSelect("jsx")}
						>
							JSX
						</TabButton>
						<TabButton
							isSelected={content === "props"}
							onClick={() => handleSelect("props")}
						>
							Props
						</TabButton>
						<TabButton
							isSelected={content === "state"}
							onClick={() => handleSelect("state")}
						>
							State
						</TabButton>
					</>
				}
			>
				{tabContent()}
			</Tabs>
		</Section>
	);
}
