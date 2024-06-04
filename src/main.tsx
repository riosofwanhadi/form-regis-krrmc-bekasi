import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Global } from "@emotion/react";
import { montserrat } from "./assets/index.ts";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";

function CustomFont() {
	return (
		<Global
			styles={[
				{
					"@font-face": {
						fontFamily: "Montserrat",
						src: `url(${montserrat}) format("woff")`,
						fontStyle: "normal",
					},
				},
			]}
		/>
	);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<MantineProvider
			theme={{
				fontFamily: "Montserrat",
			}}
		>
			<Notifications />
			<App />
		</MantineProvider>
	</React.StrictMode>
);
