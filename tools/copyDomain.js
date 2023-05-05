export default function copyDomain() {
	copyToClipboard(window.location.hostname);

	notify({
		text: `Copied domain to clipboard`,
	});
}
