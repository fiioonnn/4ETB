function checkLinks() {
	const links = Array.from(document.querySelectorAll("a"));
	const result = {
		missingHref: [],
		emptyHref: [],
		emptyFragment: [],
		externalLinks: [],
		nonSSL: [],
		targetBlank: [],
	};

	links.forEach((link) => {
		const href = link.getAttribute("href");
		const target = link.getAttribute("target");

		if (!href) return result.missingHref.push(link);
		if (href === "") return result.emptyHref.push(link);
		if (href === "#") return result.emptyFragment.push(link);
		if (href.startsWith("http://")) return result.nonSSL.push(link);
		if (target === "_blank") return result.targetBlank.push(link);
		if (
			link.host !== location.host &&
			!href.startsWith("mailto") &&
			!href.startsWith("tel:")
		) {
			return result.externalLinks.push(link);
		}
	});

	const markResults = (links) => {
		links.forEach((link, index) => {
			mark(link, index * 500, links.length - 1, index);
		});
	};

	notify(
		0,
		0,
		[
			result.missingHref.length > 0 && {
				text: "Mark missing href",
				callback: markResults.bind(null, result.missingHref),
			},
			result.emptyHref.length > 0 && {
				text: "Mark empty href",
				callback: markResults.bind(null, result.emptyHref),
			},
			result.emptyFragment.length > 0 && {
				text: "Mark empty fragment",
				callback: markResults.bind(null, result.emptyFragment),
			},
			result.externalLinks.length > 0 && {
				text: "Mark external links",
				callback: markResults.bind(null, result.externalLinks),
			},
			result.nonSSL.length > 0 && {
				text: "Mark non SSL links",
				callback: markResults.bind(null, result.nonSSL),
			},
			result.targetBlank.length > 0 && {
				text: "Mark target blank links",
				callback: markResults.bind(null, result.targetBlank),
			},
		],
		"4ETB - Check Links",
		`Missing href: ${result.missingHref.length}`,
		`Empty href: ${result.emptyHref.length}`,
		`Empty fragment: ${result.emptyFragment.length}`,
		`External Links: ${result.externalLinks.length}`,
		`Non SSL Links: ${result.nonSSL.length}`,
		`Target blank: ${result.targetBlank.length}`
	);
}

function checkImages() {}

function outlines() {
	// give every element an outline to see the layout
	if (!window.outlinesEnabled) {
		// give outline with color based on nesting depth
		document.querySelectorAll("*").forEach((element) => {
			element.style.outlineOffset = "";
			element.style.outline = `1px solid ${randomColor()}`;
		});

		window.outlinesEnabled = true;
	} else {
		document.querySelectorAll("*").forEach((element) => {
			element.style.outline = "";
		});
		window.outlinesEnabled = false;
	}
}

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
			overflowingElements.length && {
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

const getAdobeIds = () => {
	if (!localStorage.getItem("adobe_ids")) {
		return notify(3000, 0, null, "Get Adobe Ids", "No ids found");
	}

	const result = JSON.parse(localStorage.getItem("adobe_ids"));

	if (result.all.length === 0) {
		return notify(3000, 0, null, "Get Adobe Ids", "No ids found");
	}

	notify(
		3000,
		0,
		[
			{
				text: "Copy",
				callback: () => {
					copyToClipboard(result.all.join("\n"));
				},
			},
		],
		"Adobe Id's",
		`Total: ${result.all.length}`,
		result.all.join("<br>")
	);
};

const clearAdobeIds = () => {
	localStorage.removeItem("adobe_ids");
	notify(3000, 0, null, "Success", "Cleared all Adobe Image ids");
};

const fetchAdobeIds = () => {
	const images = Array.from(document.querySelectorAll("img"));
	let result = {
		all: [],
		licensed: [],
		preview: [],
	};
	let addedCount = 0;

	if (!images) {
		return notify(3000, 0, null, "Fetch Adobe Id's", "No images were found");
	}

	if (!localStorage.getItem("adobe_ids")) {
		localStorage.setItem("adobe_ids", JSON.stringify(result));
	}

	result = JSON.parse(localStorage.getItem("adobe_ids"));

	images.forEach((image) => {
		const src = image.src;

		if (!src.includes("adobestock")) return;

		const id = src
			.split("adobestock_")[1]
			.split("-")[0]
			.split("_")[0]
			.split(".")[0];

		if (result.all.includes(id)) return;
		console.log(id, result.all);
		addedCount++;

		if (src.includes("preview")) result.preview.push(id);
		if (!src.includes("preview")) result.licensed.push(id);

		result.all.push(id);

		localStorage.setItem("adobe_ids", JSON.stringify(result));
	});

	if (result.all.length == 0) {
		return notify(
			3000,
			0,
			null,
			"Fetch Adobe Id's",
			"No adobe images were found"
		);
	}

	notify(
		3000,
		0,
		[
			{
				text: "Get id's",
				callback: getAdobeIds.bind(null, false),
			},
		],
		"Adobe Id's",
		"Added " +
			addedCount +
			" id's to local storage. Total: " +
			result.all.length
	);
};

function detectEmptyCssRules() {
	const stylesheets = Array.from(document.styleSheets);
	let emptyRules = 0;
	let totalRules = 0;
	let result = [];

	stylesheets.forEach((stylesheet) => {
		const rules = Array.from(stylesheet.cssRules);

		rules.forEach((rule) => {
			// check if the ruleset is empty like .test {} or .test { }
			if (rule.cssText.includes("{}") || rule.cssText.includes("{ }")) {
				emptyRules++;
				result.push(rule.selectorText);
			}

			if (rule.selectorText == "theyWontFindMe") {
				console.info("test");
			}

			totalRules++;
		});
	});

	notify(
		10000,
		0,
		null,
		"Empty CSS rules",
		`Found ${emptyRules} empty rules out of ${totalRules} total rules`,
		result.join("<br>")
	);
}

function checkImages() {
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

	const markResults = (images) => {
		images.forEach((image, index) => {
			mark(image, index * 500, images.length - 1, index);
		});
	};

	notify(
		0,
		0,
		[
			result.missingAlt.length && {
				text: "Mark missing alt attributes",
				callback: markResults.bind(null, result.missingAlt),
			},
			result.missingSrc.length && {
				text: "Mark missing src attributes",
				callback: markResults.bind(null, result.missingSrc),
			},
		],
		"Check Images",
		`Missing or Empty alt attributes: ${result.missingAlt.length}`,
		`Missing or Empty src attributes: ${result.missingSrc.length}`
	);
}

function findLoremIpsumText() {
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

	notify(
		5000,
		0,
		[
			result.length && {
				text: "Mark lorem ipsum text",
				callback: () => {
					result.forEach((element, index) => {
						mark(element, index * 300, result.length - 1, index);
					});
				},
			},
		],
		"Lorem Ipsum",
		`Found ${result.length} elements, that contain lorem ipsum text`
	);
}
