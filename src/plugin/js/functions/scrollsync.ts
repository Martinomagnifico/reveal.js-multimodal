/**
 * Following a modal's scroll position between the presentation and speaker
 * windows. No workie with iFrames.
 */
export class ScrollFollower {
	private readonly send: (at: number) => void;

	private scroller?: HTMLElement;
	private applying = false;
	// One message per frame
	private queued = false;
	private lastPosition = -1;

	constructor(send: (at: number) => void) {
		this.send = send;
	}

	attach(scroller: HTMLElement): void {
		this.detach();
		this.scroller = scroller;
		scroller.addEventListener("scroll", this.onScroll, { passive: true });
	}

	detach(): void {
		this.scroller?.removeEventListener("scroll", this.onScroll);
		this.scroller = undefined;
		this.applying = false;
		this.lastPosition = -1;
	}

	apply(at: number): void {
		const distance = this.distance();
		if (distance === undefined || !this.scroller) return;

		this.applying = true;
		this.lastPosition = at;
		this.scroller.scrollTop = at * distance;

		// Scroll events fire before rAF
		requestAnimationFrame(() => {
			this.applying = false;
		});
	}

	private distance(): number | undefined {
		if (!this.scroller) return undefined;
		const distance = this.scroller.scrollHeight - this.scroller.clientHeight;
		return distance > 0 ? distance : undefined;
	}

	private onScroll = (): void => {
		if (this.applying || this.queued) return;
		this.queued = true;

		requestAnimationFrame(() => {
			this.queued = false;

			const distance = this.distance();
			if (distance === undefined || !this.scroller) return;

			const at = this.scroller.scrollTop / distance;
			if (Math.abs(at - this.lastPosition) < 0.001) return;

			this.lastPosition = at;
			this.send(at);
		});
	};
}
