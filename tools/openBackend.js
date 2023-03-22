export default function openBackend() {
	const html = document.documentElement.outerHTML;
	const backends = {
		wordpress: {
			backend: "wp-admin",
			keywords: ["wp-admin", "wp-content", "wp-includes"],
		},
		typo3: {
			backend: "typo3",
			keywords: ["typo3", "typo3temp", "typo3conf"],
		},
	};

	const backend = Object.keys(backends).find((backend) => {
		return backends[backend].keywords.some((keyword) => {
			return html.includes(keyword);
		});
	});

	if (backend) {
		setTimeout(() => {
			window.location =
				window.location.origin + "/" + backends[backend].backend;
		}, 1000);
	} else {
		notify({
			text: "No backend found",
		});
		return;
	}

	notify({
		text: "Opening backend...",
		duration: 1000,
	});
}
