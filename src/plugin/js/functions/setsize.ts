import type { Config } from "../config";
import { roundToStep } from "../helpers";
import type { Modal } from "../modal";

// Fit the modal in the deck, and unscale the border
export const setSize = (
	margin: number,
	revealEl: HTMLElement,
	revealScale: number,
	modal: Modal,
	options: Config
): void => {
	const revealWidth = revealEl.offsetWidth;
	const revealHeight = revealEl.offsetHeight;

	const maxWidth = ((1 - margin) * revealWidth) / revealScale;
	const maxHeight = ((1 - margin) * revealHeight) / revealScale;

	modal.modalElement.style.setProperty("--mm-maxwidth", `${Math.floor(maxWidth)}px`);
	modal.modalElement.style.setProperty("--mm-maxheight", `${Math.floor(maxHeight)}px`);

	if (!options.scalecorrection) return;

	const inverseScale = Math.max(1, 1 / revealScale);
	modal.modalElement.style.setProperty(
		"--mm-inversescale",
		String(roundToStep(inverseScale, 0.01))
	);

	const borderWidth = options.borderwidth.match(/(\d*\.?\d+)\s*(\w+)/);

	if (borderWidth !== null) {
		const sizeValue = Number.parseFloat(borderWidth[1]);
		const unit = borderWidth[2];
		const newBorderwidth = roundToStep(sizeValue * inverseScale, 0.5) + unit;
		modal.modalElement.style.setProperty("--mm-borderwidth", newBorderwidth);
	}
};
