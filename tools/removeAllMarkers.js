export default function removeAllMarkers() {
	const markers = document.querySelectorAll(".fouretb-marked");

	markers.forEach((marker) => marker.classList.remove("fouretb-marked"));

	notify({
		text: `All markers removed`,
	});
}
