export default function removeAdobeStockIds() {
	localStorage.removeItem("adobe_ids");
	notify({
		text: "Adobe Stock IDs removed",
	});
}
