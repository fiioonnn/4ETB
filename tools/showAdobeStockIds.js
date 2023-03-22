export default function showAdobeStockIds() {
	if (!localStorage.getItem("adobe_ids")) {
		return notify({
			text: "No Adobe Stock images in storage",
		});
	}

	const result = JSON.parse(localStorage.getItem("adobe_ids"));

	if (result.all.length === 0) {
		return notify({
			text: "No Adobe Stock images in storage",
		});
	}

	notify({
		text: [
			`Found AdobeStock ID's: :: ${result?.all.length}`,
			`Licensed: :: ${result?.licensed.length}`,
			`Preview: :: ${result?.preview.length}`,
		],
		buttons: [
			{
				text: "Copy all",
				callback: () => {
					copyToClipboard(result.all.join(","));
				},
			},
			{
				text: "Copy licensed",
				callback: () => {
					copyToClipboard(result.licensed.join(","));
				},
			},
			{
				text: "Copy preview",
				callback: () => {
					copyToClipboard(result.preview.join(","));
				},
			},
			{
				text: "Copy all as HTML list",
				callback: () => {
					copyToClipboard(
						result.all
							.map((id) => {
								return `<li>${id}${
									result.preview.includes(id) ? "(preview)" : ""
								}</li>`;
							})
							.join("")
					);
				},
			},
		],
	});
}
