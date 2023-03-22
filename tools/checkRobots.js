export default function checkRobots() {
	const meta = document.querySelector("meta[name='robots']");

	if (!meta) {
		notify({
			text: "Indexing/Following is #missing",
		});
		return;
	}

	const content = meta.getAttribute("content");

	if (content.includes("noindex") || content.includes("nofollow")) {
		notify({
			text: "Indexing/Following is #disabled",
		});
		return;
	}

	notify({
		text: "Indexing/Following is #enabled",
		duration: 5000,
	});
}
