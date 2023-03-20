/**
 *
 * POPUP.JS
 *
 */

$("#checkLinks").onclick = () => send("checkLinks");
$("#checkImages").onclick = () => send("checkImages");
$("#outlines").onclick = () => {
	$("#outlines").innerText = $("#outlines").innerText.includes("(Off)")
		? "Outlines (On)"
		: "Outlines (Off)";

	send("outlines");
};
$("#detectOverflow").onclick = () => send("detectOverflow");
$("#fetchAdobeIds").onclick = () => send("fetchAdobeIds");
$("#getAdobeIds").onclick = () => send("getAdobeIds");
$("#clearAdobeIds").onclick = () => send("clearAdobeIds");
$("#detectEmptyCssRules").onclick = () => send("detectEmptyCssRules");

function $(selector) {
	return document.querySelector(selector);
}

function send(message) {
	browser.runtime.sendMessage({ action: message });
}
