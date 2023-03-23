async function run(file) {
	const module = await import(browser.runtime.getURL(`tools/${file}.js`));
	module.default();
}

export default function findAdobeStockIds() {
	let result = {
		all: [],
		licensed: [],
		preview: [],
	};

	let addedCount = 0;

	if (!localStorage.getItem("adobe_ids")) {
		localStorage.setItem("adobe_ids", JSON.stringify(result));
	}

	const ids = getAdobeIds();

	if (!ids || ids?.length === 0) {
		return notify({
			text: "No Adobe Stock images found",
		});
	}

	ids.forEach((id) => {
		if (id.includes("preview")) {
			id = id.replace("_preview", "");
			result.preview.push(id);
		} else {
			result.licensed.push(id);
		}
		result.all.push(id);
	});

	localStorage.setItem("adobe_ids", JSON.stringify(result));

	notify({
		text: [
			`Found ${ids.length} AdobeStock ID's`,
			`Added ${addedCount} new ID's to storage`,
		],
		duration: 10000,
	});

	run("showAdobeStockIds");
}

function getAdobeIds() {
	const regex = /adobestock_[0-9]+[\d+]+([-_]preview)?/gi;
	const source = getPageSource();
	if (!source) return;
	const matches = source.match(regex)?.map((match) => {
		return match.toLowerCase().replace("adobestock_", "");
	});

	return [...new Set(matches)];
}

function getPageSource() {
	let source = "";

	const stylesheets = Array.from(
		document.querySelectorAll("link[rel='stylesheet']")
	);
	const js = Array.from(document.querySelectorAll("script"));
	const images = Array.from(document.querySelectorAll("img"));
	const html = document.documentElement.outerHTML;
	const css = stylesheets.map((stylesheet) => {
		try {
			return Array.from(stylesheet.sheet.cssRules).map((rule) => {
				return rule.cssText;
			});
		} catch (error) {
			return;
		}
	});

	source += js.join("");
	source += images.map((image) => image.src).join("");
	source += html;
	source += css;

	return source;
}
