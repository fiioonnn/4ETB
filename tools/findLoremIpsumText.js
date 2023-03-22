export default function findLoremIpsumText() {
	const elements = Array.from(document.querySelectorAll("*"));
	const allowedTags = [
		"p",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"li",
		"span",
		"a",
		"b",
		"s",
		"i",
		"button",
		"input",
		"textarea",
		"strong",
		"u",
	];
	const loremIpsum = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur"];
	let result = [];

	elements.forEach((element) => {
		if (!allowedTags.includes(element.tagName.toLowerCase())) return;

		const text = element.textContent.toLowerCase();

		if (loremIpsum.some((word) => text.includes(word))) {
			result.push(element);
		}
	});

	notify({
		text: `Lorem ipsum text found: :: ${result.length}`,
		buttons: [
			result.length > 0 && {
				text: "Mark lorem ipsum text",
				callback: () => {
					mark(result);
				},
			},
		],
		duration: 0,
	});
}
