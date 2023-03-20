function mark(element, delay, end = 0, index, scrollTo = true) {
	document.querySelectorAll("*").forEach((element) => {
		element.style.outline = "";
		element.style.outlineOffset = "";
	});

	setTimeout(() => {
		if (scrollTo) {
			element.scrollIntoView({ behavior: "smooth", block: "center" });
		}

		element.style.outline = "2px solid red";
		element.style.outlineOffset = "2px";

		if (index == end) {
			notify(2000, 0, null, "Done", "Marked all elements");
		}
	}, delay);
}

function copyToClipboard(text) {
	navigator.clipboard.writeText(text).then(() => {
		notify(3000, 0, null, "Copied to clipboard", text);
	});
}

function randomColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
