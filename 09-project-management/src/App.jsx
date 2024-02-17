import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SideBar from "./components/SideBar";

function App() {
	const [noProjectSelected, setNoProjectSelected] = useState(true);
	return (
		<main className="h-screen my-8 flex gap-8">
			<SideBar />
			{noProjectSelected ? (
				<NoProjectSelected setNoProjectSelected={setNoProjectSelected} />
			) : (
				<NewProject />
			)}
		</main>
	);
}

export default App;
