import type { Config } from "../config";
import type { Modal } from "../modal";

// Metadata first, so a broken video never opens
export async function loadVideo(
	url: string | null,
	modal: Modal,
	options: Config
): Promise<string | undefined> {
	if (!url) {
		console.error("No URL provided for video modal");
		return undefined;
	}

	try {
		const video = document.createElement("video");
		video.src = url;
		video.controls = options.videocontrols;
		video.preload = "metadata";

		await new Promise((resolve, reject) => {
			video.addEventListener("loadedmetadata", resolve);
			video.addEventListener("error", reject);
		});

		if (video.readyState < 0) {
			throw new Error("Video metadata cannot be loaded.");
		}

		video.preload = "auto";
		modal.modalElement.dataset.modalType = "video";
		video.classList.add("mm-body");
		return video.outerHTML;
	} catch (error) {
		console.error("Error loading video:", error);
		return undefined;
	}
}
