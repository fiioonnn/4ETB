export default function checkImages() {
	const images = Array.from(document.querySelectorAll("img"));
	const result = {
		missingAlt: [],
		missingSrc: [],
	};

	images.forEach((image) => {
		const alt = image.getAttribute("alt");
		const src = image.getAttribute("src");

		if (!alt || alt == "") result.missingAlt.push(image);
		if (!src || src == "") result.missingSrc.push(image);
	});

	notify({
		text: [
			`Images without alt: :: ${result.missingAlt.length}`,
			`Images without src: :: ${result.missingSrc.length}`,
		],
		buttons: [
			result.missingAlt.length && {
				text: "Mark images without alt",
				callback: () => {
					mark(result.missingAlt);
				},
			},
			result.missingSrc.length && {
				text: "Mark images without src",
				callback: () => {
					mark(result.missingSrc);
				},
			},
		],
		duration: 10000,
	});
}
