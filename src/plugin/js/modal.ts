import type { RevealApi } from "reveal.js";
import { createModalContainer } from "./functions/createmodal";
import type { ModalEventDetail, ModalEventListener, PresetConfigs } from "./types";

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

const DEFAULT_CLOSE_BUTTON_HTML = `<button class="mm-close" type="button" aria-hidden="true" data-modal-close aria-label="Close"><svg class="offset" viewport="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(45 12 12)"><line x1="0" y1="12" x2="24" y2="12"></line><line x1="12" y1="0" x2="12" y2="24"></line></g></svg></button>`;

export class Modal {
	private _isOpen: boolean;

	modalElement: HTMLElement;
	modalMax: HTMLElement;
	modalDialog: HTMLElement;
	modalBody: HTMLElement;

	/** Written by setupOptions, and by an author through `closebuttonhtml`. */
	closeButtonHtml: string;
	/** The element that opened the modal, read back when it is shown. */
	triggerElement?: HTMLElement;
	/** The deck's navigation settings, kept so lockNav can restore them. */
	presetConfigs: PresetConfigs;
	closeOnClickOutside?: (event: MouseEvent) => void;
	isLocked?: boolean;

	private eventListeners: Record<string, ModalEventListener[]>;

	get isOpen(): boolean {
		return this._isOpen;
	}

	/**
	 * Build the modal for a deck: add the container if the author has not written
	 * one themselves, then wrap it.
	 */
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
		this.modalElement.style.setProperty("display", "none");
		this.modalElement.setAttribute("aria-hidden", "true");
		this.eventListeners = {};
		this.presetConfigs = { keyboard: true, mouseWheel: false, scrollProgress: "auto" };
		this.closeButtonHtml = DEFAULT_CLOSE_BUTTON_HTML;

		this.modalElement.addEventListener("transitionend", (event: TransitionEvent) => {
			// Only the modal's own transition, not one bubbling up from its content.
			if (event.target !== this.modalElement) return;

			if (!this._isOpen) {
				// Modal is hidden
				this.modalElement.classList.remove(SHOWN_CLASS);
				this.modalElement.classList.remove(SHOW_CLASS);
				this.modalElement.style.setProperty("display", "none");
				this.trigger(EVENT_HIDDEN, "hidden");

				// Drop whatever classes the trigger added, keeping the plugin's own.
				for (const className of Array.from(this.modalElement.classList)) {
					if (
						className !== MODAL_ELEMENT_CLASS &&
						className !== SHOW_CLASS &&
						className !== SHOWN_CLASS &&
						className !== "hide" &&
						className !== "hidden"
					) {
						this.modalElement.classList.remove(className);
					}
				}
			} else {
				// Modal is shown
				this.modalElement.classList.add(SHOWN_CLASS);
				this.trigger(EVENT_SHOWN, "shown");
			}
		});
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

		// With no transition there is no transitionend to wait for, so both states
		// are announced here instead.
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
				this.modalElement.classList.add(SHOW_CLASS);
				this.trigger(EVENT_SHOW, "show");
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
		} else {
			this.modalElement.classList.remove(SHOW_CLASS);
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
