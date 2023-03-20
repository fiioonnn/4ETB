function mark(element, delay, end = 0, scrollTo = true) {
	setTimeout(() => {
		if (scrollTo) {
			element.scrollIntoView({ behavior: "smooth", block: "center" });
		}

		element.style.outline = "1px solid red";
		element.style.outlineOffset = "2px";

		if (end === 0) {
			index === end
				? notify(2000, 0, null, "Done", "Marked all elements")
				: null;
		}
	}, delay);
}

function copyToClipboard(text) {
	navigator.clipboard.writeText(text).then(() => {
		notify(3000, 0, null, "Copied to clipboard", text);
	});
}
