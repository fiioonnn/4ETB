export default function checkH1() {
	const h1 = document.querySelectorAll("h1");

	if (h1.length === 0) {
		notify({
			text: "❌ No h1 tags found",
		});
		return;
	}

	if (h1.length > 1) {
		notify({
			text: "❌ Multiple h1 tags found",
		});
		return;
	}

	notify({
		text: "✅ Only one h1 tag found",
		buttons: [
			h1.length && {
				text: `Mark h1${h1.length > 1 ? "'s" : ""} tag`,
				callback: () => {
					mark(h1);
				},
			},
		],
		duration: 6000,
	});
}
