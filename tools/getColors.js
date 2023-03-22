export default function getColors() {
	const allElements = document.getElementsByTagName("*"); // Get all elements on the page
	const allColors = new Set(); // Set to store unique colors

	// Loop through all elements and get their computed styles
	for (let i = 0; i < allElements.length; i++) {
		const element = allElements[i];
		const styles = getComputedStyle(element);

		// Get the color of the element
		const color = styles.getPropertyValue("color");

		// Add the color to the set if it's not already present
		if (color && color !== "transparent") {
			allColors.add(color);
		}
	}

	// convert all colors from rgb to hex

	notify({
		text: [
			`Found ${allColors.size} colors:`,
			...[...allColors].map((color) => {
				return `<span style="background-color: ${color}; width: 20px; height: 20px; display: inline-block; margin-right: 5px;"></span>${color}`;
			}),
		],
		buttons: [
			{
				text: "Copy to clipboard",
				callback: () => {
					copyToClipboard([...allColors].join("\n"));
				},
			},
		],
		duration: 10000,
	});
}
