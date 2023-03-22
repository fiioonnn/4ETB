export default function scrollToMarkers() {
	const markers = Array.from(document.querySelectorAll(".fouretb-marked"));
	console.log(markers);
	if (!markers.length) {
		notify({
			text: "No markers found",
		});
		return;
	}

	markers.forEach((marker, index) => {
		setTimeout(() => {
			if (!isElementInViewport(marker)) {
				marker.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "center",
				});
			}
		}, 300 * index);
	});
	notify({
		text: "Scrolling to markers..",
	});
}

function isElementInViewport(el) {
	const rect = el.getBoundingClientRect();

	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}
