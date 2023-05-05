/**
 * 4ETB - POPUP.JS
 *
 * When registering a new function, add it to the register function,
 * make sure that the id is unique and the same as the function name
 * inside the tools directory.
 */

// Helpers
register("#toggleOutlines");
register("#toggleDesignMode");
register("#openBackend");
register("#getColors");
// Checks
register("#checkLinks");
register("#checkImages");
register("#checkH1");
register("#checkRobots");

register("#scrollToMarkers");
register("#removeAllMarkers");

register("#findEmptyCssRules");
register("#findLoremIpsumText");
register("#findOverflowingElements");

register("#findAdobeStockIds");
register("#clearAdobeStockIds");

register("#validateHtml");

// Tools
register("#copyDomain");

function register(id) {
	document.querySelector(id).onclick = () => {
		browser.runtime.sendMessage({
			action: id.substring(1),
		});
	};
}

/**
 * MENU LOGIC
 */
const parentItems = document.querySelectorAll(".menu__item--parent");
const subMenus = document.querySelectorAll(".menu__list--sub");
const menu = document.querySelector(".menu");

parentItems.forEach((item) => {
	const subMenu = item.querySelector(".menu__list--sub");
	item.onclick = (e) => {
		if (e.target === item) {
			subMenu.classList.toggle("menu__list--active");
		}
	};
});

subMenus.forEach((menu) => {
	const button = menu.querySelector("button");
	button.onclick = () => {
		menu.classList.remove("menu__list--active");
	};
});

// Add info from manifest

let manifest = browser.runtime.getManifest();

document.querySelector("#name").innerText = manifest.name;
document.querySelector("#version").innerText = manifest.version;
