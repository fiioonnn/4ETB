// function getAdobeIds() {
// 	const images = Array.from(document.querySelectorAll("img"));
// 	const result = {
// 		all: [],
// 		licensed: [],
// 		preview: [],
// 	};
// 	// https://p627511.webspaceconfig.de/wp-content/uploads/2023/03/adobestock_503638178-scaled.jpeg
// 	images.forEach((image) => {
// 		const src = image.src;

// 		if (!src.includes("adobestock")) return;

// 		const id = src
// 			.split("adobestock_")[1]
// 			.split("-")[0]
// 			.split("_")[0]
// 			.split(".")[0];

// 		if (src.includes("preview")) result.preview.push(id);
// 		if (!src.includes("preview")) result.licensed.push(id);
// 		result.all.push(id);
// 	});

// 	notify(
// 		5000,
// 		0,
// 		[
// 			{
// 				text: "Copy all",
// 				callback: () => {
// 					copyToClipboard(result.all.join(", "));
// 				},
// 			},
// 			{
// 				text: "Copy licensed",
// 				callback: () => {
// 					copyToClipboard(result.licensed.join(", "));
// 				},
// 			},
// 			{
// 				text: "Copy preview",
// 				callback: () => {
// 					copyToClipboard(result.preview.join(", "));
// 				},
// 			},
// 		],
// 		"Adobe IDs",
// 		`Found ${result.all.length} Adobe IDs`
// 	);
// }

/*

 found 4 adobe ids:
 000
 000
 00
 00

*/

function getAdobeIds() {}

function checkLinks() {
	const links = Array.from(document.querySelectorAll("a"));
	const result = {
		missingHref: [],
		emptyHref: [],
		emptyFragment: [],
	};

	links.forEach((link) => {
		const href = link.getAttribute("href");

		if (!href) return result.missingHref.push(link);
		if (href === "") return result.emptyHref.push(link);
		if (href === "#") return result.emptyFragment.push(link);
	});

	const markResults = (links) => {
		links.forEach((link, index) => {
			mark(link, index * 100, result.missingHref.length);
		});
	};

	notify(
		0,
		0,
		[
			{
				text: "Mark missing href",
				callback: markResults.bind(null, result.missingHref),
			},
			{
				text: "Mark empty href",
				callback: markResults.bind(null, result.missingHref),
			},
			{
				text: "Mark empty fragment",
				callback: markResults.bind(null, result.missingHref),
			},
		],
		"4ETB - Check Links",
		`Missing href: ${result.missingHref.length}`,
		`Empty href: ${result.emptyHref.length}`,
		`Empty fragment: ${result.emptyFragment.length}`
	);
}

function checkImages() {}

function outlines() {}

function detectOverflow() {
	const elements = Array.from(document.querySelectorAll("*"));
	const overflowingElements = [];

	elements.forEach((element, index) => {
		if (element.offsetWidth > window.innerWidth) {
			overflowingElements.push(element);
		}
	});

	notify(
		5000,
		0,
		[
			{
				text: "Mark overflowing elements",
				callback: () => {
					overflowingElements.forEach((element, index) => {
						mark(element, index * 100, overflowingElements.length);
					});
				},
			},
		],
		"Overflowing Elements",
		`Found ${overflowingElements.length} overflowing elements`
	);
}
