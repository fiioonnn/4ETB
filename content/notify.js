(() => {
	const notifications = document.createElement("div");
	notifications.classList.add("fouretb-notifications");
	document.body.appendChild(notifications);
})();

function notify(props = {}) {
	const notifications = document.querySelector(".fouretb-notifications");
	const notification = document.createElement("div");

	if (!props.title) props.title = "4ETB";
	if (props.duration === undefined) props.duration = 1000;

	if (typeof props.text === "string") {
		props.text = [props.text];
	}

	if (props.text) {
		props.text = props.text
			.map((text) => {
				return `<p>${text}</p>`;
			})
			.join("");

		let colors = {
			"#true": "#4ece4e",
			"#false": "#e44848",
			"#enabled": "#4ece4e",
			"#disabled": "#e44848",
			"#undefined": "#cece4e",
			"#missing": "#e44848",
			"#ok": "#4ece4e",
			"#error": "#e44848",
			"#warning": "#cece4e",
		};

		for (const [key, value] of Object.entries(colors)) {
			props.text = props.text.replace(
				new RegExp(key, "gi"),
				`<b style="color: ${value};">${key.substring(1)}</b>`
			);
		}
	}

	props.text = props.text.replace(
		/::/g,
		`<span style="margin-left: auto; display: block;"></span>`
	);

	notification.classList.add("fouretb-notification");
	notification.innerHTML = `
		<div class="fouretb-notification__head">
			<img src="${browser.runtime.getURL("assets/icons/4ETB.svg")}"/>
				<h3>${props?.title}</h3>
			</div>
			${
				props?.text
					? `<div class="fouretb-notification__body">${props?.text}</div>`
					: ""
			}
			${
				props.buttons && props.buttons.some((button) => button)
					? `<div class="fouretb-notification__buttons"></div>`
					: ""
			}
		</div>
	`;

	if (props.buttons) {
		props.buttons.forEach((button) => {
			if (!button) return;

			const notificationButton = document.createElement("button");
			const notificationButtons = notification.querySelector(
				".fouretb-notification__buttons"
			);
			notificationButton.innerText = button.text;
			notificationButton.onclick = button.callback;
			notificationButtons.appendChild(notificationButton);
		});
	}

	let timer = null;
	let progress = 0;
	let mouseOver = true;

	if (props.duration > 0) {
		timer = setInterval(() => {
			if (!mouseOver) return;

			progress += 100 / (props.duration / 100);
			notification.style.setProperty("--fetb-progress", progress + "%");

			if (progress >= 105) notification.hide();
		}, 100);
	}

	notification.hide = () => {
		notification.style.transform = "translateX(-200%)";
		setTimeout(() => {
			notification.remove();
			clearInterval(timer);
		}, 300);
	};

	notification.onmouseenter = () => {
		mouseOver = false;
	};

	notification.onmouseleave = () => {
		mouseOver = true;
	};

	notification.onmouseup = (e) => {
		if (e.target.tagName === "BUTTON") return;
		notification.hide();
	};

	notifications.appendChild(notification);

	return notification;
}
