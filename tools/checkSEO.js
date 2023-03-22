/**
 * 4ETB - checkSEO.JS
 * Search Engine Optimization (SEO) Checker
 * Checks for:
 * - Meta Description
 * - Meta Keywords
 * - Meta Robots
 * - Double H1
 */

export default function checkSEO() {
	validateHTML();
	notify({
		title: "SEO Check",
		text: [
			`Unique H1: :: ${doubleH1()}`,
			`Indexing: :: ${checkIndexing()}`,
			`Title is set: :: ${checkTitle()}`,
		],
		buttons: [
			{
				text: "Mark headings (H1)",
				callback: () => {
					mark(document.querySelectorAll("h1"));
				},
			},
		],
		duration: 0,
	});
}

function doubleH1() {
	const h1 = document.querySelectorAll("h1");
	if (!h1?.length) return "No H1 found";
	if (h1.length > 1) return `${h1.length} H1 found`;
	if (h1.length === 1) return true;
	return "error";
}

function checkTitle() {
	const title = document.querySelector("title");

	if (title) {
		return true;
	}
	return false;
}

function checkIndexing() {
	const meta = document.querySelector("meta[name='robots']");

	if (meta) {
		const content = meta.getAttribute("content");

		return content.includes("noindex") || content.includes("nofollow")
			? "disabled"
			: "enabled";
	}

	return "missing";
}

function validateHTML(html) {
	let n = notify({
		text: "Validating HTML.. Please wait...",
	});

	fetch("https://validator.w3.org/nu/?out=json", {
		method: "POST",
		headers: {
			"Content-Type": "text/html",
		},
		body: document.documentElement.outerHTML,
	})
		.then((response) => response.json())
		.then((data) => {
			notify({
				title: "HTML Validation",
				text: [
					`Errors: :: ${
						data?.messages?.filter((message) => message.type === "error").length
					}`,
					`Warnings: :: ${
						data?.messages?.filter((message) => message.type === "warning")
							.length
					}`,
				],
				buttons: [
					{
						text: "validator.w3.org",
						callback: () => {
							window.open(
								`https://validator.w3.org/nu/?doc=${encodeURIComponent(
									window.location.href
								)}`
							);
						},
					},
					{
						text: "Log to console",
						callback: () => {
							console.log(data);
							notify({ text: "Logged to console." });
						},
					},
				],

				duration: 0,
			});
			n.hide();
		})
		.catch((error) => {
			console.error(error);
		});
}
