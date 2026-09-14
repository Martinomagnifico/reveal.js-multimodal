import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock-upgrade";
import type { RevealApi } from "reveal.js";
import type { Modal } from "../modal";

export const setPresetConfigs = (deck: RevealApi, modal: Modal): void => {
	modal.presetConfigs = {
		keyboard: deck.getConfig().keyboard,
		mouseWheel: deck.getConfig().mouseWheel,
		scrollProgress: deck.getConfig().scrollProgress,
	};
};

export const isScroller = (deck: RevealApi): boolean => {
	const revealEl = deck.getRevealElement();
	if (!revealEl) {
		return false;
	}

	return !!revealEl.closest(".reveal-scroll");
};

// Escape closes, space plays or pauses a video
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
