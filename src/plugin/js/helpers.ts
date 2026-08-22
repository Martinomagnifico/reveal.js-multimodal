import type { RevealApi } from "reveal.js";

/**
 * Round a value to the nearest step, so a scale-corrected border does not end up
 * with a long tail of decimals.
 */
export const roundToStep = (value: number, step = 1.0): number => {
	const inv = 1.0 / step;
	return Math.round(value * inv) / inv;
};

/**
 * Reveal's `on` is typed as `HTMLElement['addEventListener']`, so a listener is
 * handed a plain `Event` and the slide properties Reveal adds are invisible to
 * TypeScript. This narrows once, in one place, instead of at every handler.
 */
export const onDeckEvent = <T extends Event>(
	deck: RevealApi,
	eventName: string,
	handler: (event: T) => void
): void => {
	deck.on(eventName, (event) => handler(event as T));
};
