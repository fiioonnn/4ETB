export default function checkLinks() {
	const links = Array.from(document.querySelectorAll("a"));

	const result = {
		withoutHref: [],
		external: [],
		unsecure: [],
		emptyFragment: [],
		emptyHref: [],
		targetBlank: [],
	};

	links.forEach((link) => {
		const href = link.getAttribute("href");
		const target = link.getAttribute("target");

		if (!href) return result.withoutHref.push(link);
		if (href === "") return result.emptyHref.push(link);
		if (href === "#") return result.emptyFragment.push(link);
		if (href.startsWith("http://")) return result.unsecure.push(link);
		if (target === "_blank") return result.targetBlank.push(link);
		if (
			link.host !== location.host &&
			!href.startsWith("mailto") &&
			!href.startsWith("tel:")
		) {
			return result.external.push(link);
		}
	});

	notify({
		text: [
			`Links without href: :: ${result.withoutHref.length}`,
			`External links: :: ${result.external.length}`,
			`Unsecure links: :: ${result.unsecure.length}`,
			`Links with empty fragment: :: ${result.emptyFragment.length}`,
			`Links with empty href: :: ${result.emptyHref.length}`,
			`Links with target blank: :: ${result.targetBlank.length}`,
		],
		buttons: [
			result.withoutHref.length && {
				text: "Mark links without href",
				callback: () => {
					mark(result.withoutHref);
				},
			},
			result.external.length > 0 && {
				text: "Mark external links",
				callback: () => {
					mark(result.external);
				},
			},
			result.unsecure.length > 0 && {
				text: "Mark unsecure links",
				callback: () => {
					mark(result.unsecure);
				},
			},
			result.emptyFragment.length > 0 && {
				text: "Mark links with empty fragment",
				callback: () => {
					mark(result.emptyFragment);
				},
			},

			result.emptyHref.length > 0 && {
				text: "Mark links with empty href",
				callback: () => {
					mark(result.emptyHref);
				},
			},
			result.targetBlank.length > 0 && {
				text: "Mark links with target blank",
				callback: () => {
					mark(result.targetBlank);
				},
			},
		],
		duration: 10000,
	});
}
