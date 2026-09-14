// Images only, for now
export function preloadFromSlide(slide: HTMLElement): void {
	const slideTriggers = slide.querySelectorAll<HTMLElement>("[data-modal-type]");

	for (const trigger of slideTriggers) {
		if (trigger.dataset.modalType !== "image") continue;

		let triggerUrl = trigger.dataset.modalUrl || trigger.getAttribute("href") || null;

		if (!triggerUrl) {
			const firstChild = trigger.firstElementChild;
			triggerUrl =
				firstChild instanceof HTMLImageElement ? firstChild.getAttribute("src") : null;
		}

		if (triggerUrl) {
			const img = new Image();
			img.src = triggerUrl;
		}
	}
}
