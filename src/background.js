/**
 *
 * BACKGROUND.JS
 *
 */

// Listen for messages from the popup script
browser.runtime.onMessage.addListener((message) => {
	if (message.action === "checkLinks") send("checkLinks");
	if (message.action === "checkImages") send("checkImages");
	if (message.action === "outlines") send("outlines");
	if (message.action === "detectOverflow") send("detectOverflow");
	if (message.action === "fetchAdobeIds") send("fetchAdobeIds");
	if (message.action === "getAdobeIds") send("getAdobeIds");
	if (message.action === "clearAdobeIds") send("clearAdobeIds");
	if (message.action === "detectEmptyCssRules") send("detectEmptyCssRules");
	if (message.action === "findLoremIpsumText") send("findLoremIpsumText");
});

function send(message) {
	browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
		browser.tabs.sendMessage(tabs[0].id, { action: message });
	});
}
