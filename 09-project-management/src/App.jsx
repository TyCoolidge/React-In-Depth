import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SideBar from "./components/SideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
	const [projectsState, setProjectsState] = useState({
		selectedProjectId: undefined,
		projects: [],
	});

	function handleStartAddProject() {
		setProjectsState((prevState) => {
			// keeping old state to preserve projects array, with db this probably isnt needed
			return {
				...prevState,
				selectedProjectId: null,
			};
		});
	}

	function handleCancelAddProject() {
		setProjectsState((prevState) => {
			// keeping old state to preserve projects array, with db this probably isnt needed
			return {
				...prevState,
				selectedProjectId: undefined,
			};
		});
	}

	function handleSelectProject(id) {
		setProjectsState((prevState) => {
			// keeping old state to preserve projects array, with db this probably isnt needed
			return {
				...prevState,
				selectedProjectId: id,
			};
		});
	}

	function handleAddPoject(newProject) {
		setProjectsState((prevState) => {
			return {
				...prevState,
				projects: [...prevState.projects, newProject],
				selectedProjectId: undefined,
			};
		});
	}

	function renderProjectComponent() {
		if (projectsState.selectedProjectId === undefined) {
			return <NoProjectSelected onStartAddProject={handleStartAddProject} />;
		} else if (projectsState.selectedProjectId === null) {
			return (
				<NewProject onAdd={handleAddPoject} onCancel={handleCancelAddProject} />
			);
		} else if (projectsState.selectedProjectId) {
			return (
				<SelectedProject
					project={projectsState.projects.find(
						(project) => project.id === projectsState.selectedProjectId
					)}
				/>
			);
		}
	}

	return (
		<main className="h-screen my-8 flex gap-8">
			<SideBar
				onStartAddProject={handleStartAddProject}
				projects={projectsState.projects}
				onSelectProject={handleSelectProject}
				selectedProjectId={projectsState.selectedProjectId}
			/>
			{renderProjectComponent()}
		</main>
	);
}

export default App;
