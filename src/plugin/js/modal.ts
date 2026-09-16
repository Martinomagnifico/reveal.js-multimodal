import type { RevealApi } from "reveal.js";
import { createModalContainer } from "./functions/createmodal";
import type { ModalEventDetail, ModalEventListener } from "./types";

const MODAL_ELEMENT_CLASS = "multimodal";
const MODAL_MAX_CLASS = "mm-max";
const MODAL_DIALOG_CLASS = "mm-dialog";
const MODAL_BODY_CLASS = "mm-body";
const SHOWN_CLASS = "shown";
const SHOW_CLASS = "show";

const EVENT_SHOW = "multimodal:show";
const EVENT_SHOWN = "multimodal:shown";
const EVENT_HIDE = "multimodal:hide";
const EVENT_HIDDEN = "multimodal:hidden";

// Extra time the backup timer gives the fade, beyond its own duration
const SETTLE_MARGIN = 200;

// "0.3s" or "300ms" in milliseconds, or null when it is not a time
const toMilliseconds = (value: string): number | null => {
	const match = value.trim().match(/^(\d*\.?\d+)(ms|s)$/);
	if (!match) return null;
	return Number.parseFloat(match[1]) * (match[2] === "s" ? 1000 : 1);
};

const DEFAULT_CLOSE_BUTTON_HTML = `<button class="mm-close" type="button" data-modal-close aria-label="Close"><svg class="offset" viewport="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(45 12 12)"><line x1="0" y1="12" x2="24" y2="12"></line><line x1="12" y1="0" x2="12" y2="24"></line></g></svg></button>`;

export class Modal {
	private _isOpen: boolean;
	// Whether the last show or hide has finished its fade
	private settled = true;
	private settleTimer?: number;

	modalElement: HTMLElement;
	modalMax: HTMLElement;
	modalDialog: HTMLElement;
	modalBody: HTMLElement;

	closeButtonHtml: string;
	triggerElement?: HTMLElement;
	closeOnClickOutside?: (event: MouseEvent) => void;
	isLocked?: boolean;

	private eventListeners: Record<string, ModalEventListener[]>;
	// Classes added by data-modal-class
	private triggerClasses: string[];

	get isOpen(): boolean {
		return this._isOpen;
	}

	// Add the container if the author has not
	static create(deck: RevealApi): Modal {
		const revealEl = deck.getRevealElement();
		if (!revealEl) {
			throw new Error("Reveal element not found");
		}

		if (!revealEl.querySelector(`.${MODAL_ELEMENT_CLASS}`)) {
			createModalContainer(deck);
		}

		return new Modal(deck);
	}

	constructor(deck: RevealApi) {
		this._isOpen = false;

		const revealElement = deck.getRevealElement();
		if (!revealElement) {
			throw new Error("Reveal element not found");
		}

		const modalElement = revealElement.querySelector<HTMLElement>(`.${MODAL_ELEMENT_CLASS}`);
		if (!modalElement) {
			throw new Error(`Modal element with class ${MODAL_ELEMENT_CLASS} not found`);
		}
		this.modalElement = modalElement;

		this.modalMax = this.modalElement.querySelector(`.${MODAL_MAX_CLASS}`) as HTMLElement;
		this.modalDialog = this.modalElement.querySelector(`.${MODAL_DIALOG_CLASS}`) as HTMLElement;
		this.modalBody = this.modalElement.querySelector(`.${MODAL_BODY_CLASS}`) as HTMLElement;
		// Focusable by script only, so it can take focus when the modal opens
		this.modalDialog.setAttribute("role", "dialog");
		this.modalDialog.setAttribute("aria-modal", "true");
		this.modalDialog.setAttribute("tabindex", "-1");
		this.modalElement.style.setProperty("display", "none");
		this.modalElement.setAttribute("aria-hidden", "true");
		this.eventListeners = {};
		this.triggerClasses = [];
		this.closeButtonHtml = DEFAULT_CLOSE_BUTTON_HTML;

		this.modalElement.addEventListener("transitionend", (event: TransitionEvent) => {
			// Ignore transitions from the content
			if (event.target !== this.modalElement) return;
			this.settle();
		});
	}

	// How long the fade takes, from --mm-transspeed, which the speed option also sets. If that cannot be read, then from the duration the browser computed.
	private transitionTime(): number {
		const style = window.getComputedStyle(this.modalElement);
		const speed = toMilliseconds(style.getPropertyValue("--mm-transspeed"));
		if (speed !== null) return speed;
		const durations = style.transitionDuration
			.split(",")
			.map((value) => toMilliseconds(value) ?? 0);
		return Math.max(0, ...durations);
	}

	// A fade has started. Normally transitionend finishes it, but when that never comes, the modal would stay in place, invisible, and take every click.
	private settleLater(): void {
		this.settled = false;
		clearTimeout(this.settleTimer);
		this.settleTimer = window.setTimeout(
			() => this.settle(),
			this.transitionTime() + SETTLE_MARGIN
		);
	}

	// Finishes the fade once, from transitionend or the backup timer, whichever comes first
	private settle(): void {
		clearTimeout(this.settleTimer);
		if (this.settled) return;
		this.settled = true;

		if (!this._isOpen) {
			// Modal is hidden
			this.modalElement.classList.remove(SHOWN_CLASS);
			this.modalElement.classList.remove(SHOW_CLASS);
			this.modalElement.style.setProperty("display", "none");
			this.trigger(EVENT_HIDDEN, "hidden");
			this.setTriggerClasses([]);
		} else {
			// Modal is shown
			this.modalElement.classList.add(SHOWN_CLASS);
			this.trigger(EVENT_SHOWN, "shown");
		}
	}

	on(event: string, listener: ModalEventListener): void {
		if (!this.eventListeners[event]) {
			this.eventListeners[event] = [];
		}
		this.eventListeners[event].push(listener);
	}

	trigger(event: string, action = "show", ...args: unknown[]): void {
		const listeners = this.eventListeners[event];
		if (listeners) {
			for (const listener of listeners) {
				listener(action, ...args);
			}
		}

		const details: ModalEventDetail = {
			action,
			trigger: this.triggerElement,
			modal: this.modalElement,
			dialog: this.modalDialog,
			body: this.modalDialog.querySelector(`.${MODAL_BODY_CLASS}`) as HTMLElement,
			args,
		};

		this.modalElement.dispatchEvent(new CustomEvent(event, { detail: details }));
	}

	show(): void {
		this._isOpen = true;
		this.modalElement.style.removeProperty("display");
		this.modalElement.removeAttribute("aria-hidden");

		// No transition, so no transitionend
		if (
			window.getComputedStyle(this.modalElement).getPropertyValue("transition-duration") ===
			"0s"
		) {
			this.modalElement.classList.add(SHOW_CLASS);
			this.trigger(EVENT_SHOW, "show");
			this.modalElement.classList.add(SHOWN_CLASS);
			this.trigger(EVENT_SHOWN, "shown");
		} else {
			setTimeout(() => {
				// Closed again in the meantime
				if (!this._isOpen) return;
				this.modalElement.classList.add(SHOW_CLASS);
				this.trigger(EVENT_SHOW, "show");
				this.settleLater();
			}, 10);
		}
	}

	hide(): void {
		this._isOpen = false;
		this.trigger(EVENT_HIDE, "hide");

		this.modalElement.setAttribute("aria-hidden", "true");
		if (
			window.getComputedStyle(this.modalElement).getPropertyValue("transition-duration") ===
			"0s"
		) {
			this.modalElement.classList.remove(SHOWN_CLASS);
			this.modalElement.classList.remove(SHOW_CLASS);
			this.modalElement.style.setProperty("display", "none");
			this.trigger(EVENT_HIDDEN, "hide");
			this.setTriggerClasses([]);
		} else {
			this.modalElement.classList.remove(SHOW_CLASS);
			// Already hidden, so there is no fade to finish
			if (this.modalElement.style.display !== "none") {
				this.settleLater();
			}
		}
	}

	// Swap the trigger's classes, never the modal's own
	setTriggerClasses(classNames: string[]): void {
		for (const className of this.triggerClasses) {
			this.modalElement.classList.remove(className);
		}
		this.triggerClasses = [];

		for (const className of classNames) {
			if (!className || this.modalElement.classList.contains(className)) continue;
			this.modalElement.classList.add(className);
			this.triggerClasses.push(className);
		}
	}

	setContent(content: string, type?: string): void {
		const htmlString =
			type === "html"
				? `<div class="mm-body"><div class="mm-scrollbody">${content}</div></div>`
				: content;

		this.modalDialog.innerHTML = this.closeButtonHtml + htmlString;
	}
}
