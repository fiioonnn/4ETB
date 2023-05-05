async function copyToClipboard(text) {
	await navigator.clipboard.writeText(text).then(() => {
		notify({
			text: "Copied to clipboard",
		});
	});
}

async function copyPageUrl() {
	try {
		await navigator.clipboard.writeText(location.href);
		console.log("Page URL copied to clipboard");
	} catch (err) {
		console.error("Failed to copy: ", err);
	}
}

function randomColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function mark(elements) {
	const allElements = Array.from(document.querySelectorAll("*"));

	allElements.map((element) => {
		element.classList.remove("fouretb-marked");
	});

	elements.forEach((element) => {
		element.classList.add("fouretb-marked");
	});

	elements[0].scrollIntoView({ behavior: "smooth", block: "center" });

	notify({
		text: "Marked all elements",
		duration: 1000,
	});
}
