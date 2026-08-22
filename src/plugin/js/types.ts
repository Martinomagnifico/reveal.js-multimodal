import type { RevealConfig } from "reveal.js";

export type ModalEventListener = (action: string, ...args: unknown[]) => void;

export interface ModalEventDetail {
	action: string;
	trigger?: HTMLElement;
	modal: HTMLElement;
	dialog: HTMLElement;
	body: HTMLElement;
	args: unknown[];
}

/**
 * The deck's own navigation settings, kept so they can be restored after a modal
 * that locked navigation is closed.
 */
export interface PresetConfigs {
	keyboard: RevealConfig["keyboard"];
	mouseWheel: RevealConfig["mouseWheel"];
	scrollProgress: RevealConfig["scrollProgress"];
}

/**
 * Reveal types its own events as plain DOM events, so the slide properties it
 * adds are not on the type. Handlers are given this instead.
 */
export interface RevealSlideEvent extends Event {
	currentSlide: HTMLElement;
	previousSlide: HTMLElement;
	indexh: number;
	indexv: number;
}

/**
 * `resize` carries the new scale rather than a slide.
 */
export interface RevealResizeEvent extends Event {
	scale: number;
}
