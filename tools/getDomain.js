export default function getDomain() {
	notify({
		text: window.location.hostname,
		buttons: [
			{
				text: "Copy to clipboard",
				callback: () => {
					copyToClipboard(window.location.hostname);
				},
			},
		],
		duration: 2000,
	});
}
