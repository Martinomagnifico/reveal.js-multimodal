import "../css/index.scss";

// Basic imports
import type { RevealApi } from "reveal.js";
// Helper imports
import { pluginDebug as debug, PluginBase, pluginCSS } from "reveal.js-plugintoolkit";
import type { Config } from "./config";
import { defaultConfig } from "./config";

// Function imports
import { Multimodal } from "./main";

const PLUGIN_ID = "multimodal";

const init = async (plugin: PluginBase<Config>, deck: RevealApi, config: Config): Promise<void> => {
	// Init debug
	if (debug && config.debug) {
		debug.initialize(true, PLUGIN_ID);
	}

	// Quarto ships its own copy of the plugin CSS, so autoloading it there would
	// only duplicate what is already on the page.
	const generatorMetaTag = document.querySelector("meta[name=generator]");
	const isQuartoContent =
		generatorMetaTag instanceof HTMLMetaElement && generatorMetaTag.content.includes("quarto");

	if (!isQuartoContent) {
		await pluginCSS(plugin, config);
	}

	await Multimodal.create(deck, config);
};

export default () => {
	const plugin = new PluginBase(PLUGIN_ID, init, defaultConfig);
	return plugin.createInterface();
};
