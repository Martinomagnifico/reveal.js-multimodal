import type { RevealApi } from "reveal.js";

// Sync modals with the speaker view over postMessage. Both windows are same-origin.

const NAMESPACE = "multimodal";

interface HelloMessage {
	namespace: typeof NAMESPACE;
	type: "hello";
}

interface OpenMessage {
	namespace: typeof NAMESPACE;
	type: "open";
	index: number;
	modalType: string;
	url: string | null;
}

interface CloseMessage {
	namespace: typeof NAMESPACE;
	type: "close";
}

// Scroll position as a fraction
interface ScrollMessage {
	namespace: typeof NAMESPACE;
	type: "scroll";
	at: number;
}

type SyncMessage = HelloMessage | OpenMessage | CloseMessage | ScrollMessage;

export interface SyncHandlers {
	open: (trigger: HTMLElement) => void;
	close: () => void;
	scroll: (at: number) => void;
}

const triggerUrl = (trigger: HTMLElement): string | null =>
	trigger.dataset.modalUrl || trigger.getAttribute("href") || null;

// Main window, from the speaker view preview
const findMainWindow = (): Window | undefined => {
	try {
		if (window.parent === window.self) return undefined;
		return (window.parent.opener as Window | null) ?? undefined;
	} catch {
		return undefined;
	}
};

export class SpeakerSync {
	private readonly revealEl: HTMLElement;
	private readonly handlers: SyncHandlers;

	private readonly isPreview: boolean;
	private readonly mainWindow?: Window;
	private readonly peers = new Set<Window>();

	// Prevents echoes
	private lastState = "";
	// For a speaker window that connects later
	private openMessage?: OpenMessage;

	static create(
		deck: RevealApi,
		revealEl: HTMLElement,
		handlers: SyncHandlers
	): SpeakerSync | undefined {
		const isSpeakerWindow = deck.isSpeakerNotes();

		// Only the current slide preview has postMessageEvents
		if (isSpeakerWindow && deck.getConfig().postMessageEvents !== true) {
			return undefined;
		}

		return new SpeakerSync(deck, revealEl, handlers, isSpeakerWindow);
	}

	private constructor(
		deck: RevealApi,
		revealEl: HTMLElement,
		handlers: SyncHandlers,
		isPreview: boolean
	) {
		this.revealEl = revealEl;
		this.handlers = handlers;
		this.isPreview = isPreview;
		this.mainWindow = isPreview ? findMainWindow() : undefined;

		window.addEventListener("message", this.onMessage);

		if (isPreview) {
			deck.on("ready", () => {
				if (this.mainWindow) {
					this.post(this.mainWindow, { namespace: NAMESPACE, type: "hello" });
				}
			});
		}
	}

	sendOpen(trigger?: HTMLElement): void {
		if (!trigger) return;

		const message = this.describe(trigger);
		if (!message) return;

		this.openMessage = message;
		this.broadcast(message);
	}

	sendClose(): void {
		this.openMessage = undefined;
		this.broadcast({ namespace: NAMESPACE, type: "close" });
	}

	sendScroll(at: number): void {
		for (const target of this.targets()) {
			this.post(target, { namespace: NAMESPACE, type: "scroll", at });
		}
	}

	// Same list in both windows
	private triggers(): HTMLElement[] {
		return Array.from(this.revealEl.querySelectorAll<HTMLElement>("[data-modal-type]"));
	}

	private describe(trigger: HTMLElement): OpenMessage | undefined {
		const modalType = trigger.dataset.modalType;
		if (!modalType) return undefined;

		const index = this.triggers().indexOf(trigger);
		if (index === -1) return undefined;

		return {
			namespace: NAMESPACE,
			type: "open",
			index,
			modalType,
			url: triggerUrl(trigger),
		};
	}

	// By index, or by type and url
	private resolve(message: OpenMessage): HTMLElement | undefined {
		const triggers = this.triggers();
		const matches = (trigger: HTMLElement): boolean =>
			trigger.dataset.modalType === message.modalType && triggerUrl(trigger) === message.url;

		const atIndex = triggers[message.index];
		return atIndex && matches(atIndex) ? atIndex : triggers.find(matches);
	}

	private targets(): Window[] {
		if (this.isPreview) {
			return this.mainWindow ? [this.mainWindow] : [];
		}

		for (const peer of this.peers) {
			if (peer.closed) this.peers.delete(peer);
		}
		return Array.from(this.peers);
	}

	private post(target: Window, message: SyncMessage): void {
		try {
			target.postMessage(JSON.stringify(message), "*");
		} catch {
			// Window is gone
		}
	}

	private broadcast(message: OpenMessage | CloseMessage): void {
		const state = JSON.stringify(message);
		if (state === this.lastState) return;
		this.lastState = state;

		for (const target of this.targets()) {
			this.post(target, message);
		}
	}

	private onMessage = (event: MessageEvent): void => {
		if (event.origin !== window.location.origin) return;
		if (typeof event.data !== "string") return;

		let message: SyncMessage;
		try {
			message = JSON.parse(event.data);
		} catch {
			return;
		}

		if (!message || message.namespace !== NAMESPACE) return;

		if (message.type === "hello") {
			const source = event.source as Window | null;
			if (this.isPreview || !source) return;

			this.peers.add(source);
			if (this.openMessage) this.post(source, this.openMessage);
			return;
		}

		if (message.type === "scroll") {
			this.handlers.scroll(message.at);
			return;
		}

		// Echo
		const state = JSON.stringify(message);
		if (state === this.lastState) return;
		this.lastState = state;

		if (message.type === "close") {
			this.openMessage = undefined;
			this.handlers.close();
			return;
		}

		const trigger = this.resolve(message);
		if (!trigger) return;

		this.openMessage = message;
		this.handlers.open(trigger);
	};
}
