import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock-upgrade";
import type { RevealApi } from "reveal.js";
import type { Modal } from "../modal";

// Escape and space, which an open modal handles itself
const MODAL_KEYS = ["Escape", " "];

export const isScroller = (deck: RevealApi): boolean => {
	const revealEl = deck.getRevealElement();
	if (!revealEl) {
		return false;
	}

	return !!revealEl.closest(".reveal-scroll");
};

// Reveal asks this before it handles a key. Set once while the plugins load, because reconfiguring the deck when a modal opens lays it out again, which can move the slide.
export const setKeyboardCondition = (deck: RevealApi, modal: Modal): void => {
	const authorCondition = deck.getConfig().keyboardCondition;

	deck.configure({
		keyboardCondition: (event: KeyboardEvent) => {
			if (isLockedFullscreenEscape(event)) {
				return false;
			}
			if (modal.isOpen && !isScroller(deck)) {
				if (modal.isLocked || MODAL_KEYS.includes(event.key)) {
					return false;
				}
			}
			if (typeof authorCondition === "function") {
				return authorCondition(event);
			}
			if (authorCondition === "focused") {
				return deck.isFocused();
			}
			return true;
		},
	});
};

// Keys Reveal leaves alone too: typing in a field, or a shortcut with ctrl or meta
const isIgnoredKey = (event: KeyboardEvent): boolean => {
	const active = document.activeElement as HTMLElement | null;
	if (active?.isContentEditable || /input|textarea/i.test(active?.tagName ?? "")) {
		return true;
	}
	return event.ctrlKey || event.metaKey;
};

// Space closes, or plays or pauses a video
export const spaceHide = (event: KeyboardEvent, deck: RevealApi, modal: Modal): void => {
	if (event.key !== " " || modal.isLocked || isScroller(deck) || isIgnoredKey(event)) {
		return;
	}

	event.preventDefault();
	const video =
		modal.modalElement.dataset.modalType === "video"
			? modal.modalDialog.querySelector("video")
			: null;

	if (!video) {
		modal.hide();
	} else if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
};

export const lockNav = (modal: Modal): void => {
	if (modal.modalElement) {
		disableBodyScroll(modal.modalElement);
	}
	modal.isLocked = true;
};

export const unlockNav = (modal: Modal): void => {
	if (modal.modalElement) {
		enableBodyScroll(modal.modalElement);
	}
	modal.isLocked = false;
};

// The Keyboard Lock API, in Chromium only
type KeyboardLock = { lock(keys?: string[]): Promise<void>; unlock(): void };
const keyboardLock = (): KeyboardLock | undefined =>
	(navigator as Navigator & { keyboard?: KeyboardLock }).keyboard;

// In fullscreen the browser takes Escape to leave it, and the page never sees the key. Locked, a press of Escape comes to the page, and holding it still leaves fullscreen. The lock only works in fullscreen, and is refused in an iframe.
let escapeLocked = false;
let escapeWanted = false;

const releaseEscape = (): void => {
	escapeWanted = false;
	if (escapeLocked) {
		escapeLocked = false;
		keyboardLock()?.unlock();
	}
};

// True when Escape comes to the page only because of the lock, so it should leave fullscreen
export const isLockedFullscreenEscape = (event: KeyboardEvent): boolean =>
	event.key === "Escape" && escapeLocked && !!document.fullscreenElement;

export const setupEscapeLock = (modal: Modal): void => {
	if (!keyboardLock()) return;

	document.addEventListener("fullscreenchange", () => {
		if (!document.fullscreenElement) {
			releaseEscape();
		}
	});

	// Capture, so it runs before the modal's own listener closes the modal
	document.addEventListener(
		"keydown",
		(event: KeyboardEvent) => {
			if (!modal.isOpen && isLockedFullscreenEscape(event)) {
				event.preventDefault();
				document.exitFullscreen();
			}
		},
		true
	);
};

export const lockEscape = (): void => {
	escapeWanted = true;
	keyboardLock()
		?.lock(["Escape"])
		.then(
			() => {
				escapeLocked = true;
				// The modal closed outside fullscreen before the lock came
				if (!escapeWanted) {
					releaseEscape();
				}
			},
			() => {}
		);
};

// Chrome can still leave fullscreen when the lock ends just after the Escape that closed the modal. So in fullscreen the lock stays until fullscreen ends, and meanwhile Escape leaves fullscreen through the page.
export const unlockEscape = (): void => {
	if (!document.fullscreenElement) {
		releaseEscape();
	}
};

// The modal covers the viewport, so a wheel event starts inside it. Stopped there, it still reaches the modal's content, but not Reveal.
export const blockWheel = (modal: Modal): void => {
	modal.modalElement.addEventListener("wheel", (event: WheelEvent) => {
		if (modal.isLocked) {
			event.stopPropagation();
		}
	});
};
