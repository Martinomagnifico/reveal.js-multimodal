import type { RevealApi } from "reveal.js";

export const roundToStep = (value: number, step = 1.0): number => {
	const inv = 1.0 / step;
	return Math.round(value * inv) / inv;
};

// Typed deck.on
export const onDeckEvent = <T extends Event>(
	deck: RevealApi,
	eventName: string,
	handler: (event: T) => void
): void => {
	deck.on(eventName, (event) => handler(event as T));
};

// Both speaker view panels load the deck with ?receiver
export const isSpeakerView = (): boolean => /receiver/i.test(window.location.search);

const SILENCEABLE_HOSTS = /(?:^|\.)(?:youtube(?:-nocookie)?\.com|youtu\.be|vimeo\.com)$/i;

// Mute autoplaying iframes in speaker view: mute param for YouTube/Vimeo, no autoplay for others
export const silenceUrl = (url: string): string => {
	try {
		const parsed = new URL(url, window.location.href);
		if (!parsed.searchParams.has("autoplay")) return url;

		if (SILENCEABLE_HOSTS.test(parsed.hostname)) {
			parsed.searchParams.set("mute", "1");
			parsed.searchParams.set("muted", "1");
		} else {
			parsed.searchParams.set("autoplay", "0");
		}

		return parsed.toString();
	} catch {
		// Not a valid URL
		return url;
	}
};
