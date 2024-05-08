import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, className = "" }) {
	const dialogRef = useRef();

	useEffect(() => {
		const modal = dialogRef.current; //recommended to create copy because the ref could possibly change before cleanup occurs
		if (open) {
			modal.showModal();
		}

		// clean up runs when dependency changes
		return () => modal.close();
	}, [open]);

	return createPortal(
		<dialog ref={dialogRef} className={`modal ${className}`}>
			{children}
		</dialog>,
		document.getElementById("modal")
	);
}

export default Modal;
