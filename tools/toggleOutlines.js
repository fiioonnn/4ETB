let outlinesActive = false;

export default function toggleOutlines() {
	const elements = Array.from(document.querySelectorAll("*"));

	!outlinesActive &&
		elements.map((element) => {
			if (
				element.classList.value.includes("fouretb") ||
				element.parentElement?.classList.value.includes("fouretb")
			)
				return;

			element.style.outline = `1px solid ${randomColor()}`;
			element.style.outlineOffset = "";
		});

	outlinesActive &&
		elements.map((element) => {
			element.style.outline = "";
		});

	outlinesActive = !outlinesActive;

	notify({
		text: `Outlines ${outlinesActive ? "#enabled" : "#disabled"}`,
	});
}
