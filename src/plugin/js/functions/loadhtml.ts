import { marked } from "marked";
import type { Modal } from "../modal";

/**
 * Resolve an HTML source into markup: an id on the page, a fetched .md file, or
 * a fetched .html file. Returns undefined when the source cannot be resolved —
 * the caller treats that as "do not open", so a failure never rejects out of a
 * click handler.
 */
export async function loadHTML(source: string | null, modal: Modal): Promise<string | undefined> {
	try {
		if (typeof source !== "string") {
			throw new Error(
				"Invalid HTML content source. Must be a URL string or an anchor element."
			);
		}

		if (source.startsWith("#")) {
			const targetElement = document.querySelector(source);
			if (!targetElement) {
				throw new Error("Anchor element with specified ID not found.");
			}

			modal.modalElement.dataset.modalType = "html";

			// A slide used as a source holds its content one level down.
			return targetElement.firstElementChild?.tagName.toLowerCase() === "section"
				? targetElement.firstElementChild.innerHTML
				: targetElement.innerHTML;
		}

		if (source.endsWith(".md")) {
			const response = await fetch(source);
			if (!response.ok) {
				throw new Error("Failed to fetch MD content.");
			}
			const md = await response.text();
			modal.modalElement.dataset.modalType = "html";
			return await marked.parse(md);
		}

		if (source.endsWith(".html")) {
			const response = await fetch(source);
			if (!response.ok) {
				throw new Error("Failed to fetch HTML content.");
			}
			const html = await response.text();
			modal.modalElement.dataset.modalType = "html";
			return html;
		}

		throw new Error("Unsupported HTML content source.");
	} catch (error) {
		console.error("Error loading HTML content:", error);
		return undefined;
	}
}
