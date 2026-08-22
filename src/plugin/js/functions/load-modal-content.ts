import type { Config } from "../config";
import type { Modal } from "../modal";
import { loadHTML } from "./loadhtml";
import { loadImage } from "./loadimage";
import { loadVideo } from "./loadvideo";

/**
 * Loads content into the modal based on trigger element and type
 * @param trigger Element that triggered the modal
 * @param modal Modal instance
 * @param options Current configuration options
 * @param originalOptions Original default configuration options
 * @returns Promise that resolves when content is loaded
 */
export async function loadModalContent(
	trigger: HTMLElement,
	modal: Modal,
	options: Config,
	originalOptions?: Config
): Promise<void> {
	// Use provided originalOptions or fallback to options
	const origOpts = originalOptions || options;

	const modalType = trigger.dataset.modalType;
	const modalUrl = trigger.dataset.modalUrl || trigger.getAttribute("href") || null;

	// Ensure we have a string value for modalPadding
	let modalPadding = "";
	if (typeof options.padding === "string") {
		modalPadding = options.padding;
	} else if (options.padding && typeof options.padding !== "object") {
		modalPadding = String(options.padding);
	}

	if (
		trigger.dataset.modalOverlaycolor &&
		trigger.dataset.modalOverlaycolor !== origOpts.overlaycolor
	) {
		modal.modalElement.style.setProperty(
			"--mm-overlaycolor",
			trigger.dataset.modalOverlaycolor
		);
	}

	if (trigger.dataset.modalClass) {
		modal.modalElement.classList.add(...trigger.dataset.modalClass.split(/[ ,]+/));
	}

	if (modalType === "html") {
		// Handle HTML padding
		let htmlPadding = "";
		if (typeof options.padding === "object" && options.padding.html) {
			htmlPadding = String(options.padding.html);
		}

		modalPadding = trigger.dataset.modalPadding || htmlPadding || modalPadding;

		// Get original HTML padding for comparison
		let origHtmlPadding = "";
		if (origOpts.padding && typeof origOpts.padding === "object" && origOpts.padding.html) {
			origHtmlPadding = String(origOpts.padding.html);
		} else if (typeof origOpts.padding === "string") {
			origHtmlPadding = origOpts.padding;
		} else if (origOpts.padding) {
			origHtmlPadding = String(origOpts.padding);
		}

		if (modalPadding !== origHtmlPadding) {
			modal.modalElement.style.setProperty("--mm-modal-padding", modalPadding);
		}

		// Determine the background color
		let htmlBackground = "";
		if (typeof options.background === "object" && options.background.html) {
			htmlBackground = String(options.background.html);
		}

		const modalBackground =
			trigger.dataset.modalBackground ||
			htmlBackground ||
			(typeof options.background === "string" ? options.background : "");

		// Get original background for comparison
		let origHtmlBackground = "";
		if (
			origOpts.background &&
			typeof origOpts.background === "object" &&
			origOpts.background.html
		) {
			origHtmlBackground = String(origOpts.background.html);
		} else if (typeof origOpts.background === "string") {
			origHtmlBackground = origOpts.background;
		} else if (origOpts.background) {
			origHtmlBackground = String(origOpts.background);
		}

		if (modalBackground !== origHtmlBackground) {
			modal.modalElement.style.setProperty("--mm-modal-background", String(modalBackground));
		}
	} else if (modalType === "iframe") {
		// Handle iframe padding
		let iframePadding = "";
		if (typeof options.padding === "object" && options.padding.iframe) {
			iframePadding = String(options.padding.iframe);
		}

		modalPadding = trigger.dataset.modalPadding || iframePadding || modalPadding;

		// Get original iframe padding for comparison
		const origIframePadding = "0"; // Default for iframe

		if (modalPadding !== origIframePadding) {
			modal.modalElement.style.setProperty("--mm-modal-padding", modalPadding);
		}

		// Determine the background color
		let iframeBackground = "";
		if (typeof options.background === "object" && options.background.iframe) {
			iframeBackground = String(options.background.iframe);
		}

		const modalBackground =
			trigger.dataset.modalBgcolor ||
			iframeBackground ||
			(typeof options.background === "string" ? options.background : "");

		// Get original background for comparison
		let origIframeBackground = "";
		if (
			origOpts.background &&
			typeof origOpts.background === "object" &&
			origOpts.background.iframe
		) {
			origIframeBackground = String(origOpts.background.iframe);
		} else if (typeof origOpts.background === "string") {
			origIframeBackground = origOpts.background;
		} else if (origOpts.background) {
			origIframeBackground = String(origOpts.background);
		}

		if (modalBackground !== origIframeBackground) {
			modal.modalElement.style.setProperty("--mm-modal-background", String(modalBackground));
		}
	} else {
		// Handle media padding
		let mediaPadding = "";
		if (typeof options.padding === "object" && options.padding.media) {
			mediaPadding = String(options.padding.media);
		}

		modalPadding = trigger.dataset.modalPadding || mediaPadding || modalPadding;

		// Get original media padding for comparison
		const origMediaPadding = "0"; // Default for media

		if (modalPadding !== origMediaPadding) {
			modal.modalElement.style.setProperty("--mm-modal-padding", modalPadding);
		}

		// Determine the background color
		let mediaBackground = "";
		if (typeof options.background === "object" && options.background.media) {
			mediaBackground = String(options.background.media);
		}

		const modalBackground =
			trigger.dataset.modalBackground ||
			mediaBackground ||
			(typeof options.background === "string" ? options.background : "");

		// Get original background for comparison
		let origMediaBackground = "";
		if (
			origOpts.background &&
			typeof origOpts.background === "object" &&
			origOpts.background.media
		) {
			origMediaBackground = String(origOpts.background.media);
		} else if (typeof origOpts.background === "string") {
			origMediaBackground = origOpts.background;
		} else if (origOpts.background) {
			origMediaBackground = String(origOpts.background);
		}

		if (modalBackground !== origMediaBackground) {
			modal.modalElement.style.setProperty("--mm-modal-background", String(modalBackground));
		}
	}

	modal.triggerElement = trigger;

	let modalContent: string | undefined;
	let hasError = false;

	if (!modalType) {
		console.error("Modal type not specified");
		return;
	}

	if (modalType === "video") {
		modalContent = await loadVideo(modalUrl, modal, options);
	} else if (modalType === "image") {
		const firstChild = trigger.firstChild as HTMLElement;
		const isImg = firstChild?.tagName === "IMG";

		const imageModalUrl =
			modalUrl && modalUrl !== "#" && modalUrl !== "#/"
				? modalUrl
				: isImg
					? (firstChild as HTMLImageElement).getAttribute("src")
					: null;

		const imageAlt = isImg ? (firstChild as HTMLImageElement).getAttribute("alt") : null;

		modalContent = await loadImage(imageModalUrl, modal, imageAlt);
	} else if (modalType === "html") {
		modalContent = await loadHTML(modalUrl, modal);
	} else if (modalType === "iframe") {
		if (modalUrl) {
			modalContent = `<iframe class="mm-body" src="${modalUrl}" frameborder="0" allowfullscreen></iframe>`;
			modal.modalElement.dataset.modalType = "iframe";
		} else {
			console.error("No URL provided for iframe modal");
			hasError = true;
		}
	} else {
		console.error("Unknown modal type");
		return;
	}

	// A loader that could not resolve its source returns undefined, which is the
	// same "do not open" as an error along the way.
	if (hasError || !modalContent) {
		return;
	}

	// Set the modal content
	modal.setContent(modalContent, modalType);

	// Show the modal
	modal.show();
}
