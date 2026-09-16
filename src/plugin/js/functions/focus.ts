import type { Modal } from "../modal";

// While a modal is open, the rest of the deck is inert: it cannot be clicked, tabbed to or read out. Focus goes to the dialog, and comes back to what had it once the modal closes.
export class FocusKeeper {
	private inerted: HTMLElement[] = [];
	private returnTo: HTMLElement | null = null;

	constructor(
		private readonly revealEl: HTMLElement,
		private readonly modal: Modal
	) {}

	hold(): void {
		const active = document.activeElement;
		this.returnTo = active instanceof HTMLElement && active !== document.body ? active : null;

		for (const child of Array.from(this.revealEl.children)) {
			if (child instanceof HTMLElement && child !== this.modal.modalElement && !child.inert) {
				child.inert = true;
				this.inerted.push(child);
			}
		}

		this.modal.modalDialog.focus({ preventScroll: true });
	}

	release(): void {
		for (const element of this.inerted) {
			element.inert = false;
		}
		this.inerted = [];

		const target = this.returnTo;
		this.returnTo = null;

		// Not when the modal closed because the slide changed: the trigger is out of view then
		if (
			target?.isConnected &&
			target.getClientRects().length > 0 &&
			!target.closest("section:not(.present)")
		) {
			target.focus({ preventScroll: true });
		} else if (
			document.activeElement instanceof HTMLElement &&
			this.modal.modalElement.contains(document.activeElement)
		) {
			// Nothing to go back to, but focus should not stay in a closed modal
			document.activeElement.blur();
		}
	}
}
