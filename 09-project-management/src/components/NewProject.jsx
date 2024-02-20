import { useRef } from "react";
import Input from "./Input";

export default function NewProject({ onAdd }) {
	const titleRef = useRef();
	const descriptionRef = useRef();
	const dateRef = useRef();

	function handleSave() {
		const project = {
			id: Math.random(),
			title: titleRef.current.value,
			description: descriptionRef.current.value,
			date: dateRef.current.value,
		};

		onAdd(project);
	}

	return (
		<div className="w-[35rem] mt-16">
			<menu className="flex items-center justify-end gap-4 my-4">
				<li>
					<button className="text-stone-800 hover:text-stone-950">
						Cancel
					</button>
				</li>
				<li>
					<button
						className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
						onClick={handleSave}
					>
						Save
					</button>
				</li>
			</menu>
			<div>
				<Input type="text" ref={titleRef} title="Title" />
				<Input ref={descriptionRef} title="Description" isTextArea />
				<Input type="date" ref={dateRef} title="Due Date" />
			</div>
		</div>
	);
}
