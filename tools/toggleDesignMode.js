export default function toggleDesignMode() {
	document.designMode = document.designMode === "on" ? "off" : "on";

	notify({
		text: `Design Mode ${
			document.designMode === "on" ? "enabled" : "disabled"
		}`,
	});
}
