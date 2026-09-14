import type { Modal } from "../modal";

export async function loadImage(
	url: string | null,
	modal: Modal,
	imageAlt: string | null
): Promise<string | undefined> {
	if (!url) {
		console.error("No URL provided for image modal");
		return undefined;
	}

	return new Promise((resolve) => {
		const image = new Image();
		const altAttribute = imageAlt ? ` alt="${imageAlt}"` : "";

		image.onload = () => {
			modal.modalElement.dataset.modalType = "image";
			resolve(`<img class="mm-body" src="${url}"${altAttribute}>`);
		};
		image.onerror = () => {
			console.error(`Error loading image: ${url}`);
			resolve(undefined);
		};
		image.src = url;
	});
}
