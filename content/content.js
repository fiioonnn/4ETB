/**
 * 4ETB - CONTENT.JS
 *
 * All functions needs to be defined inside the functions object.
 * Make sure that inside the tools folder is a file with the same name as the function,
 * that exports a default function, also with the same name.
 */

async function run(file) {
	const module = await import(browser.runtime.getURL(`tools/${file}.js`));
	module.default();
}

browser.runtime.onMessage.addListener(function (request) {
	run(request.action);
});
