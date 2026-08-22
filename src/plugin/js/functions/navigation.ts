import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock-upgrade";
import type { RevealApi } from "reveal.js";
import type { Modal } from "../modal";

/**
 * Store the deck's own navigation settings on the modal, so they can be put back.
 */
export const setPresetConfigs = (deck: RevealApi, modal: Modal): void => {
	modal.presetConfigs = {
		keyboard: deck.getConfig().keyboard,
		mouseWheel: deck.getConfig().mouseWheel,
		scrollProgress: deck.getConfig().scrollProgress,
	};
};

/**
 * Whether the deck is in scroll view, where Reveal owns scrolling itself.
 */
export const isScroller = (deck: RevealApi): boolean => {
	const revealEl = deck.getRevealElement();
	if (!revealEl) {
		return false;
	}

	return !!revealEl.closest(".reveal-scroll");
};

/**
 * While a modal is open, space and escape belong to the modal: escape closes it,
 * and space plays or pauses a video rather than advancing the deck.
 */
export const spaceEscapeHide = (deck: RevealApi, modal: Modal): void => {
	if (modal.modalElement.dataset.modalType === "video") {
		const video = modal.modalDialog.querySelector("video");
		if (video) {
			deck.configure({
				keyboard: {
					27: () => {
						modal.hide();
					},
					32: () => {
						if (video.paused) {
							video.play();
						} else {
							video.pause();
						}
					},
				},
			});
		}
	} else {
		deck.configure({
			keyboard: {
				27: () => {
					modal.hide();
				},
				32: () => {
					modal.hide();
				},
			},
		});
	}
};

/**
 * Lock navigation for a modal that asked for it with `data-modal-navblock`.
 */
export const lockNav = (deck: RevealApi, modal: Modal): void => {
	if (modal.modalElement) {
		disableBodyScroll(modal.modalElement);
	}

	if (!isScroller(deck)) {
		deck.configure({
			keyboard: false,
			mouseWheel: false,
			scrollProgress: false,
		});
	}
	modal.isLocked = true;
};

/**
 * Give navigation back, restoring what the deck was configured with.
 */
export const unlockNav = (deck: RevealApi, modal: Modal): void => {
	if (modal.modalElement) {
		enableBodyScroll(modal.modalElement);
	}

	if (!isScroller(deck)) {
		deck.configure({
			keyboard: modal.presetConfigs.keyboard,
			mouseWheel: modal.presetConfigs.mouseWheel,
			scrollProgress: modal.presetConfigs.scrollProgress,
		});
	}
	modal.isLocked = false;
};
