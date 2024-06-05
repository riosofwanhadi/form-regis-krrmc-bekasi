import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Global } from "@emotion/react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import { rye_regular } from "./assets/index.ts";

function CustomFont() {
	return (
		<Global
			styles={[
				{
					"@font-face": {
						fontFamily: "RyeRegular",
						src: `url(${rye_regular}) format("woff")`,
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
			<Notifications position="top-center" />
			<CustomFont />
			<App />
		</MantineProvider>
	</React.StrictMode>
);
