/**
 * 4ETB - POPUP.JS
 *
 * When registering a new function, add it to the register function,
 * make sure that the id is unique and the same as the function name
 * inside the tools directory.
 */

register("#toggleOutlines");
register("#toggleDesignMode");

register("#checkSEO");
register("#checkLinks");
register("#checkImages");

register("#removeAllMarkers");

register("#findEmptyCssRules");
register("#findLoremIpsumText");
register("#findOverflowingElements");
register("#findAdobeStockIds");

register("#findAdobeStockIds");
register("#showAdobeStockIds");
register("#clearAdobeStockIds");

function register(id) {
	document.querySelector(id).onclick = () => {
		browser.runtime.sendMessage({
			action: id.substring(1),
		});
	};
}
