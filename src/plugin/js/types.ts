export type ModalEventListener = (action: string, ...args: unknown[]) => void;

export interface ModalEventDetail {
	action: string;
	trigger?: HTMLElement;
	modal: HTMLElement;
	dialog: HTMLElement;
	body: HTMLElement;
	args: unknown[];
}

// Reveal's slide events
export interface RevealSlideEvent extends Event {
	currentSlide: HTMLElement;
	previousSlide: HTMLElement;
	indexh: number;
	indexv: number;
}

export interface RevealResizeEvent extends Event {
	scale: number;
}
