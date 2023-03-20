/**
 *
 * POPUP.JS
 *
 */

$("#checkLinks").onclick = () => send("checkLinks");
$("#checkImages").onclick = () => send("checkImages");
$("#outlines").onclick = () => send("outlines");
$("#getAdobeIds").onclick = () => send("getAdobeIds");
$("#detectOverflow").onclick = () => send("detectOverflow");

function $(selector) {
	return document.querySelector(selector);
}

function send(message) {
	browser.runtime.sendMessage({ action: message });
}
