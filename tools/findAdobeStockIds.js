async function run(file) {
	const module = await import(browser.runtime.getURL(`tools/${file}.js`));
	module.default();
}

export default function findAdobeStockIds() {
	const images = Array.from(document.querySelectorAll("img"));
	let result = {
		all: [],
		licensed: [],
		preview: [],
	};
	let addedCount = 0;

	if (!images) {
		return notify({
			text: "No images found",
		});
	}

	if (!localStorage.getItem("adobe_ids")) {
		localStorage.setItem("adobe_ids", JSON.stringify(result));
	}

	result = JSON.parse(localStorage.getItem("adobe_ids"));

	images.forEach((image) => {
		const src = image.src;

		if (!src.includes("adobestock")) return;

		const id = src
			.split("adobestock_")[1]
			.split("-")[0]
			.split("_")[0]
			.split(".")[0];

		if (result.all.includes(id)) return;
		console.log(id, result.all);
		addedCount++;

		if (src.includes("preview")) result.preview.push(id);
		if (!src.includes("preview")) result.licensed.push(id);

		result.all.push(id);

		localStorage.setItem("adobe_ids", JSON.stringify(result));
	});

	if (result.all.length == 0) {
		return notify({
			text: "No Adobe Stock images found",
		});
	}

	notify({
		text: [
			`Found AdobeStock ID's: :: ${result.all.length}`,
			`Added: :: ${addedCount}`,
		],
		buttons: [
			result.all.length > 0 && {
				text: "Show all fetched Adobe Stock IDs",
				callback: () => {
					run("showAdobeStockIds");
				},
			},
		],
		duration: 5000,
	});
}
