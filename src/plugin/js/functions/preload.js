/**
 * Preload from the current slide triggers
 * @param {string} slide - The slide.
 */
export function preloadFromSlide(slide) {
	let slideTriggers = slide.querySelectorAll(`[data-modal-type]`);

	if (slideTriggers) {
		slideTriggers.forEach(trigger => {

			// Preload, images only for now

			if (trigger.dataset.modalType == 'image') {

				let triggerurl = trigger.dataset.modalUrl || trigger.getAttribute('href') || null;
				if (!triggerurl) {
					triggerurl = trigger.firstChild.tagName == "IMG" ? trigger.firstChild.getAttribute('src') : null;
				}
				if (triggerurl) {
					var img = new Image();
					img.src = triggerurl;
				}
			}

		});
	}
}