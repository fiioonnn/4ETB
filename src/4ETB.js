/**
 *
 * 4ETB.JS
 *
 */
// Listen for a message from the background script
browser.runtime.onMessage.addListener(async function (
	request,
	sender,
	sendResponse
) {
	if (request.action == "checkLinks") checkLinks();
	if (request.action == "checkImages") checkImages();
	if (request.action == "outlines") outlines();
	if (request.action == "getAdobeIds") getAdobeIds();
	if (request.action == "detectOverflow") detectOverflow();
});
