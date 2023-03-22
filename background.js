// background.js
browser.runtime.onMessage.addListener((message) => {
	browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
		browser.tabs.sendMessage(tabs[0].id, { action: message.action });
	});
});
