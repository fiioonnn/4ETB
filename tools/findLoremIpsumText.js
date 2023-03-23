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
		"em",
		"small",
		"big",
		"mark",
		"del",
		"ins",
		"sub",
		"sup",
		"pre",
		"code",
		"kbd",
		"var",
		"samp",
		"cite",
		"q",
		"dfn",
		"abbr",
		"ruby",
		"rt",
		"rp",
		"bdi",
		"bdo",
		"span",
		"dt",
		"dd",
		"caption",
		"th",
		"td",
		"legend",
		"label",
		"option",
		"optgroup",
		"select",
		"textarea",
		"button",
		"summary",
		"details",
		"blockquote",
		"address",
	];
	const loremIpsum = ["lorem", "ipsum"];
	let result = [];

	elements.forEach((element) => {
		if (!allowedTags.includes(element.tagName.toLowerCase())) return;

		const text = element.textContent.toLowerCase();

		loremIpsum.forEach((word) => {
			if (text.includes(word)) {
				const regex = new RegExp(`\\b${word}\\b`, "g");
				const matches = text.match(regex);

				if (matches) {
					result.push(element);
				}
			}
		});
	});

	notify({
		text: `Lorem ipsum text found: :: ${result.length}`,
		buttons: [
			result.length && {
				text: "Mark lorem ipsum text",
				callback: () => {
					mark(result);
				},
			},
		],
		duration: 10000,
	});
}
