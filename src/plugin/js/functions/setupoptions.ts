import type { Config } from "../config";
import type { Modal } from "../modal";

// Overlay colour from the deck, also reset after closing
export function applyOverlayColor(modal: Modal, options: Config, originalOptions: Config): void {
	if (options.overlaycolor !== originalOptions.overlaycolor) {
		modal.modalElement.style.setProperty("--mm-overlaycolor", options.overlaycolor);
	} else {
		modal.modalElement.style.removeProperty("--mm-overlaycolor");
	}
}

export async function setupOptions(
	modal: Modal,
	options: Config,
	originalOptions: Config
): Promise<void> {
	// Options for all modals
	if (options.closebuttonhtml !== "") {
		modal.closeButtonHtml = options.closebuttonhtml;
	}

	applyOverlayColor(modal, options, originalOptions);

	if (options.speed !== originalOptions.speed) {
		const speed = options.speed ? options.speed / 1000 : 0;
		modal.modalElement.style.setProperty("--mm-transspeed", `${speed}s`);
	}

	if (options.htmlminwidth !== originalOptions.htmlminwidth) {
		const newWidth = !Number.isNaN(Number(options.htmlminwidth))
			? `${options.htmlminwidth}px`
			: String(options.htmlminwidth);
		modal.modalElement.style.setProperty("--mm-minwidth", newWidth);
	}

	if (options.htmlminheight !== originalOptions.htmlminheight) {
		const newHeight = !Number.isNaN(Number(options.htmlminheight))
			? `${options.htmlminheight}px`
			: String(options.htmlminheight);
		modal.modalElement.style.setProperty("--mm-minheight", newHeight);
	}

	if (options.radius !== originalOptions.radius) {
		modal.modalElement.style.setProperty("--mm-outerradius", options.radius);
	}

	if (options.bordercolor !== originalOptions.bordercolor) {
		modal.modalElement.style.setProperty("--mm-bordercolor", options.bordercolor);
	}

	if (options.borderwidth !== originalOptions.borderwidth) {
		modal.modalElement.style.setProperty("--mm-borderwidth", options.borderwidth);
	}

	if (options.shadow !== originalOptions.shadow) {
		modal.modalElement.style.setProperty("--mm-shadow", options.shadow);
	}

	if (options.zoom) {
		if (options.zoomfrom !== originalOptions.zoomfrom) {
			modal.modalElement.style.setProperty("--mm-initialscale", String(options.zoomfrom));
		}
	} else {
		modal.modalElement.style.setProperty("--mm-initialscale", "1");
	}
}
