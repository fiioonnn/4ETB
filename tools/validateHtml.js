export default function validateHtml() {
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

				duration: 10000,
			});
			n.hide();
		})
		.catch((error) => {
			console.error(error);
		});
}
