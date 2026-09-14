export interface Config {
	background: {
		html: string;
		iframe: string;
		media: string;
	};
	bordercolor: string;
	borderwidth: string;
	cssautoload: boolean;
	csspath: string;
	closebuttonhtml: string;
	debug: boolean;
	htmlminwidth: string;
	htmlminheight: string;
	overlaycolor: string;
	padding: {
		html: string;
		iframe: string;
		media: string;
	};
	radius: string;
	scalecorrection: boolean;
	shadow: string;
	slidemodalevent: string;
	speed: number;
	videoautoplay: boolean;
	videocontrols: boolean;
	videoautohide: boolean;
	zoom: boolean;
	zoomfrom: number;
}

const defaultConfig: Config = {
	background: {
		html: "var(--r-background-color)",
		iframe: "var(--r-background-color)",
		media: "white",
	},
	bordercolor: "white",
	borderwidth: "1px",
	closebuttonhtml: "",
	cssautoload: true,
	csspath: "",
	debug: false,
	htmlminwidth: "100px",
	htmlminheight: "100px",
	overlaycolor: "rgba(0, 0, 0, 0.30)",
	padding: {
		html: "1em",
		iframe: "0",
		media: "0",
	},
	radius: "0.5em",
	scalecorrection: true,
	shadow: "0 0.5em 0.75em 0.5em rgba(0, 0, 0, 0.25)",
	slidemodalevent: "slidetransitionend",
	speed: 300,
	videoautoplay: true,
	videocontrols: true,
	videoautohide: true,
	zoom: true,
	zoomfrom: 0.9,
};

// Untouched defaults to compare against
const originalConfig: Config = structuredClone(defaultConfig);

export { defaultConfig, originalConfig };
