export default function toggleOverflow() {
	const html = document.querySelector("html");
	let overflow = true;

	if (html.style.overflow === "hidden") {
		html.style.overflow = "auto";
		overflow = true;
	} else {
		html.style.overflow = "hidden";
		overflow = false;
	}

	notify({
		text: `Overflow is now ${overflow ? "enabled" : "disabled"}`,
	});
}
