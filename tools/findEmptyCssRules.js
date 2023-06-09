export default function findEmptyCssRules() {
	const stylesheets = Array.from(document.styleSheets);

	let emptyRules = 0;
	let totalRules = 0;
	let result = [];

	stylesheets.forEach((stylesheet) => {
		let rules;
		try {
			rules = Array.from(stylesheet.cssRules);
		} catch (error) {
			return;
		}

		rules.forEach((rule) => {
			if (rule.cssText.includes("{}") || rule.cssText.includes("{ }")) {
				emptyRules++;
				result.push(rule.selectorText);
			}
			totalRules++;
		});
	});

	notify({
		text: [
			`Total rules: :: ${totalRules}`,
			`Empty rules: :: ${emptyRules}`,
			`<br>`,
			`${result.join("<br>")}`,
		],
		buttons: [
			result.length && {
				text: "Copy to clipboard",
				callback: () => {
					copyToClipboard(result.join("\n"));
				},
			},
		],
		duration: 10000,
	});
}
