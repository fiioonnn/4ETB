// function mark(element, delay, end = 0, index, scrollTo = true) {
// 	document.querySelectorAll("*").forEach((element) => {
// 		element.style.outline = "";
// 		element.style.outlineOffset = "";
// 	});

// 	setTimeout(() => {
// 		if (scrollTo) {
// 			element.scrollIntoView({ behavior: "smooth", block: "center" });
// 		}

// 		element.style.outline = "2px solid red";
// 		element.style.outlineOffset = "2px";

// 		if (index == end) {
// 			notify(2000, 0, null, "Done", "Marked all elements");
// 		}
// 	}, delay);
// }

function copyToClipboard(text) {
	navigator.clipboard.writeText(text).then(() => {
		notify({
			text: "Copied to clipboard",
		});
	});
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
