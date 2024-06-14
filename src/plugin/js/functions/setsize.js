import { roundToStep } from '../helpers.js';

export const setSize = (margin, revealEl, revealScale, modal, options) => {

		let revealWidth = revealEl.offsetWidth;
		let revealHeight = revealEl.offsetHeight;

		let maxWidth = (1 - margin) * revealWidth / revealScale;
		let maxHeight = (1 - margin) * revealHeight / revealScale;

		modal.modalElement.style.setProperty('--mm-maxwidth', `${Math.floor(maxWidth)}px`);
		modal.modalElement.style.setProperty('--mm-maxheight', `${Math.floor(maxHeight)}px`);

		if (options.scalecorrection) {

			let inverseScale = Math.max(1, 1 / revealScale);
			modal.modalElement.style.setProperty('--mm-inversescale', roundToStep(inverseScale, 0.01));

			let borderWidth = options.borderwidth.match(/(\d*\.?\d+)\s*(\w+)/);

			if (borderWidth !== null) {
				let sizeValue = parseFloat(borderWidth[1]);
				let unit = borderWidth[2];
				let newBorderwidth = roundToStep(sizeValue * inverseScale, 0.5) + unit;
				modal.modalElement.style.setProperty('--mm-borderwidth', newBorderwidth);
			}
		}
};