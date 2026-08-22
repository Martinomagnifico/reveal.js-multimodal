import type { RevealApi } from "reveal.js";
import type { Config } from "./config";
import { originalConfig } from "./config";
import { loadModalContent } from "./functions/load-modal-content";
import {
	isScroller,
	lockNav,
	setPresetConfigs,
	spaceEscapeHide,
	unlockNav,
} from "./functions/navigation";
import { preloadFromSlide } from "./functions/preload";
import { setSize } from "./functions/setsize";
import { setupOptions } from "./functions/setupoptions";
import { onDeckEvent } from "./helpers";
import { Modal } from "./modal";
import type { RevealResizeEvent, RevealSlideEvent } from "./types";

const TRIGGERATTRIBUTE = "data-modal-type";
const CLOSEATTRIBUTE = "data-modal-close";

const DEBUG_OUTLINE_CSS =
	".reveal .slides, .scroll-page-content:has(section.present) { box-shadow: inset 0 0 0 1px orange} .mm-max { box-shadow: inset 0 0 0 1px red}";

export class Multimodal {
	private readonly deck: RevealApi;
	private readonly options: Config;
	private readonly modal: Modal;
	private readonly revealEl: HTMLElement;
	private readonly revealMargin: number;

	private constructor(deck: RevealApi, options: Config, modal: Modal, revealEl: HTMLElement) {
		this.deck = deck;
		this.options = options;
		this.modal = modal;
		this.revealEl = revealEl;
		this.revealMargin = deck.getConfig().margin ?? 0;
	}

	/**
	 * Build the modal for this deck and wire everything to it.
	 */
	static async create(deck: RevealApi, options: Config): Promise<Multimodal> {
		const revealEl = deck.getRevealElement();
		if (!revealEl) {
			throw new Error("Reveal element not found");
		}

		const modal = Modal.create(deck);
		const multimodal = new Multimodal(deck, options, modal, revealEl);

		setPresetConfigs(deck, modal);
		await setupOptions(modal, options, originalConfig);

		multimodal.setupEventHandlers();

		if (options.debug) {
			const style = document.createElement("style");
			style.innerHTML = DEBUG_OUTLINE_CSS;
			document.head.appendChild(style);
		}

		return multimodal;
	}

	/**
	 * Escape closes an open modal, wherever focus happens to be.
	 */
	private escapePressed = (event: KeyboardEvent): void => {
		if (event.key === "Escape") {
			if (this.modal.isOpen) {
				this.modal.hide();
			}
		}
	};

	/**
	 * A trigger was clicked. An `href` of "#" is swallowed so the deck does not
	 * also navigate.
	 */
	private handleModalTrigger = async (event: Event): Promise<void> => {
		event.preventDefault();
		const target = event.currentTarget as HTMLElement;
		const href = target.getAttribute("href");
		if (href === "#" || href === "#/") {
			event.stopPropagation();
		}
		await loadModalContent(target, this.modal, this.options, originalConfig);
	};

	/**
	 * The event a slide's own modal should open on, or undefined if it has none.
	 */
	private modalEventFor(slide: HTMLElement): string | undefined {
		if (slide.dataset.modalType) {
			return slide.dataset.modalEvent
				? slide.dataset.modalEvent
				: this.options.slidemodalevent;
		}
		return undefined;
	}

	private setupEventHandlers(): void {
		for (const trigger of this.revealEl.querySelectorAll(
			`[${TRIGGERATTRIBUTE}]:not(section)`
		)) {
			trigger.addEventListener("click", this.handleModalTrigger);
		}

		// Triggers that arrive later — a fragment, a Markdown slide — are picked up
		// by an observer, because a delegated document click does not see them.
		const observer = new MutationObserver((mutationsList) => {
			for (const mutation of mutationsList) {
				if (mutation.type !== "childList") continue;
				for (const node of Array.from(mutation.addedNodes)) {
					if (!(node instanceof HTMLElement)) continue;
					if (
						node.hasAttribute(TRIGGERATTRIBUTE) &&
						node.tagName.toLowerCase() !== "section"
					) {
						node.addEventListener("click", this.handleModalTrigger);
					}
				}
			}
		});

		this.deck.addEventListener("click", (event) => {
			const target = event.target as HTMLElement;
			if (target.closest(`[${CLOSEATTRIBUTE}]`) || target.closest('a[href="#multimodal"]')) {
				event.preventDefault();
				event.stopPropagation();
				this.modal.hide();
			}
		});

		onDeckEvent<RevealSlideEvent>(this.deck, "slidechanged", (event) => {
			if (this.modal.isOpen) {
				this.modal.hide();
			}

			preloadFromSlide(event.currentSlide);

			if (isScroller(this.deck)) {
				if (
					event.currentSlide.dataset.modalType &&
					this.options.slidemodalevent === "slidetransitionend"
				) {
					// A timeout, for when the first slide is itself a this.modal slide.
					setTimeout(() => {
						if (this.deck.getCurrentSlide() === event.currentSlide) {
							loadModalContent(
								event.currentSlide,
								this.modal,
								this.options,
								originalConfig
							);
						}
					}, 10);
				}
			} else if (this.modalEventFor(event.currentSlide) === "slidechanged") {
				loadModalContent(event.currentSlide, this.modal, this.options, originalConfig);
			}
		});

		onDeckEvent<RevealSlideEvent>(this.deck, "slidetransitionend", (event) => {
			if (this.modalEventFor(event.currentSlide) === "slidetransitionend") {
				loadModalContent(event.currentSlide, this.modal, this.options, originalConfig);
			}
		});

		onDeckEvent<RevealSlideEvent>(this.deck, "ready", (event) => {
			setSize(
				this.revealMargin,
				this.revealEl,
				this.deck.getScale(),
				this.modal,
				this.options
			);

			const modalEvent = this.modalEventFor(event.currentSlide);
			if (modalEvent === "slidetransitionend" || modalEvent === "slidechanged") {
				loadModalContent(event.currentSlide, this.modal, this.options, originalConfig);
			}

			observer.observe(this.revealEl, { childList: true, subtree: true });
		});

		onDeckEvent<RevealResizeEvent>(this.deck, "resize", (event) => {
			setSize(this.revealMargin, this.revealEl, event.scale, this.modal, this.options);
		});

		// Show behaviour

		this.modal.on("multimodal:show", () => {
			this.revealEl.classList.add("multimodal-open");
			document.addEventListener("keydown", this.escapePressed);

			if (!this.modal.modalElement.closest(".reveal-scroll")) {
				spaceEscapeHide(this.deck, this.modal);
			}

			const closeOnClickOutside = (event: MouseEvent) => {
				if (this.modal.isLocked) return;
				if (
					event.target === this.modal.modalElement ||
					event.target === this.modal.modalMax
				) {
					this.modal.hide();
				}
			};

			this.modal.modalElement.addEventListener("click", closeOnClickOutside);
			this.modal.closeOnClickOutside = closeOnClickOutside;
		});

		this.modal.on("multimodal:shown", () => {
			if (this.modal.triggerElement?.dataset.modalNavblock === "true") {
				lockNav(this.deck, this.modal);
			}

			const video = this.modal.modalDialog.querySelector("video");
			if (video) {
				if (this.options.videoautoplay) {
					video.play();
				}
				if (this.options.videoautohide) {
					video.addEventListener("ended", () => {
						this.modal.hide();
					});
				}
				// iOS leaves its own fullscreen player rather than the this.modal.
				video.addEventListener("webkitendfullscreen", () => {
					if (this.options.debug) {
						console.log("Exited fullscreen");
					}
					this.modal.hide();
				});
			}
		});

		// Hide behaviour

		this.modal.on("multimodal:hide", () => {
			this.revealEl.classList.remove("multimodal-open");
			if (this.modal.closeOnClickOutside) {
				this.modal.modalElement.removeEventListener(
					"click",
					this.modal.closeOnClickOutside
				);
				this.modal.closeOnClickOutside = undefined;
			}

			unlockNav(this.deck, this.modal);
			document.removeEventListener("keydown", this.escapePressed);

			const video = this.modal.modalDialog.querySelector("video");
			if (video) {
				video.pause();
			}
		});

		this.modal.on("multimodal:hidden", () => {
			this.modal.modalBody.innerHTML = "";
			const iframe = this.modal.modalDialog.querySelector("iframe");
			if (iframe) {
				iframe.src = "";
			}
			this.modal.modalElement.style.removeProperty("--mm-modal-background");
			this.modal.modalElement.style.removeProperty("--mm-overlaycolor");
			this.modal.modalElement.style.removeProperty("--mm-modal-padding");
			this.modal.modalElement.style.removeProperty("--mm-outerradius");
		});

		if (this.options.debug) {
			for (const eventName of [
				"multimodal:show",
				"multimodal:shown",
				"multimodal:hide",
				"multimodal:hidden",
			]) {
				this.deck.on(eventName, () => {
					console.log(`Modal ${eventName.split(":")[1]}`);
				});
			}
		}
	}
}
