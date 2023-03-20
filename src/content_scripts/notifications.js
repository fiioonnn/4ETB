function buildNotifications() {
	const notifications = document.createElement("ul");
	const notificationsStyle = {
		position: "fixed",
		top: "10px",
		left: "10px",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		gap: "10px",
		zIndex: "9999999",
		margin: "0",
		padding: "0",
		listStyle: "none",
		boxSize: "border-box",
	};

	Object.assign(notifications.style, notificationsStyle);

	notifications.id = "fourETB-notifications";

	document.body.appendChild(notifications);
}

function notify(duration, delay = 0, buttons = null, title, ...text) {
	const notifications = document.getElementById("fourETB-notifications");

	const notification = document.createElement("li");
	const notificationStyle = {
		background: "#42414d",
		borderRadius: "10px",
		padding: "8px",
		display: "flex",
		flexDirection: "column",
		gap: "15px",
		minWidth: "250px",
		maxWidth: "400px",
		transition: "all 0.3s ease",
		boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
		transform: "translateX(-200%)",
		boxSizing: "border-box",
		width: "fit-content",
	};

	const notificationButtonStyle = {
		background: "#0078FF",
		color: "#fff",
		border: "none",
		borderRadius: "5px",
		padding: "4px 8px",
		cursor: "pointer",
		fontSize: "12px",
		userSelect: "none",
		lineHeight: "1.45",
		fontFamily: "sans-serif",
		fontWeight: "600",
		fontSmoothing: "greyscale",
		webkitFontSmoothing: "greyscale",
		mozOsxFontSmoothing: "grayscale",
		textSizeAdjust: "none",
		webkitTextSizeAdjust: "none",
		mozTextSizeAdjust: "none",
		color: "#fff",
		boxSizing: "border-box",
		width: "100%",
	};

	Object.assign(notification.style, notificationStyle);

	const titleStyle = `
		all: unset;
		font-size: 13px;
		font-weight: 600;
		color: #fff;
		padding: 0;
		margin: 0;
		line-height: 1;
		font-family: sans-serif;
		font-smoothing: greyscale;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-size-adjust: none;
		-webkit-text-size-adjust: none;
		-moz-text-size-adjust: none;
	`;

	const textStyle = `
		${titleStyle}
		color: #eee;
		font-weight: 500;
		font-size: 12px;
		margin-bottom: 2px;
	`;

	const headStyle = `
		display: flex;
		align-items: center;
		gap: 8px;
	`;

	const bodyStyle = `
		${headStyle}
		align-items: flex-start;
		flex-direction: column;
	`;

	const iconStyle = `
		width: 24px;
		height: 24px;
		border-radius: 5px;
	`;

	const buttonsStyle = `
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 8px;
	`;

	notification.innerHTML = `
		<div style="${headStyle}">
			<img src="${browser.runtime.getURL("icons/4ETB.svg")}" style="${iconStyle}"/>
			<h3 style="${titleStyle}">${title}</h3>
		</div>
		<div style="${bodyStyle}">
			${text.map((t) => `<p style="${textStyle}">${t}</p>`).join("")}
		</div>
		<div id="fourETB-notificationButtons" style="${buttonsStyle}"></div>
	`;

	if (buttons) {
		buttons.forEach((button) => {
			if (button?.text == undefined || button?.callback == undefined) return;
			const notificationButton = document.createElement("button");
			const notificationButtons = notification.querySelector(
				"#fourETB-notificationButtons"
			);
			Object.assign(notificationButton.style, notificationButtonStyle);
			notificationButton.onclick = button?.callback;
			notificationButton.innerText = button?.text;
			notificationButtons.appendChild(notificationButton);
		});
	}

	notification.onclick = (e) => {
		if (e.target.tagName === "BUTTON") return;

		notification.style.transform = "translateX(-200%)";
		setTimeout(() => {
			notification.remove();
		}, 300);
	};

	setTimeout(() => {
		notifications.appendChild(notification);

		setTimeout(() => {
			notification.style.transform = "translateX(0)";
		}, 100);

		if (duration == 0) return;
		setTimeout(() => {
			notification.style.transform = "translateX(-200%)";
			setTimeout(() => {
				notification.remove();
			}, 300);
		}, duration);
	}, delay);
}

buildNotifications();
