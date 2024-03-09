import Button from "./Button";

export default function SideBar({
	onStartAddProject,
	projects,
	onSelectProject,
	selectedProjectId,
}) {
	console.log(selectedProjectId);
	return (
		<aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
			<h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
				Your Projects
			</h2>
			<div>
				<Button onClick={onStartAddProject}>+ Add Project</Button>
			</div>
			<ul className="mt-8">
				{projects.map((project) => {
					const selectClasses =
						project.id === selectedProjectId
							? "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-200 bg-stone-800"
							: "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800";
					return (
						<li key={project.id}>
							<button
								onClick={() => onSelectProject(project.id)}
								className={selectClasses}
							>
								{project.title}
							</button>
						</li>
					);
				})}
			</ul>
		</aside>
	);
}
