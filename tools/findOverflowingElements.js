export default function findOverflowingElements() {
	const elements = Array.from(document.querySelectorAll("*"));
	const overflowingElements = [];

	elements.forEach((element, index) => {
		if (element.offsetWidth > window.innerWidth) {
			overflowingElements.push(element);
		}
	});

	notify({
		text: `Overflowing elements: :: ${overflowingElements.length}`,
		buttons: [
			overflowingElements.length > 0 && {
				text: "Mark overflowing elements",
				callback: () => {
					mark(overflowingElements);
				},
			},
		],
		duration: 10000,
	});
}
