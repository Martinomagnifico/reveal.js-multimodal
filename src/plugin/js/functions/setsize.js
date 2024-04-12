export const setSize = (margin, revealEl, revealScale, modal) => {

		let revealWidth = revealEl.offsetWidth;
		let revealHeight = revealEl.offsetHeight;

		let maxWidth = (1 - margin) * revealWidth / revealScale;
		let maxHeight = (1 - margin) * revealHeight / revealScale;

		modal.modalElement.style.setProperty('--mm-maxwidth', `${Math.floor(maxWidth)}px`);
		modal.modalElement.style.setProperty('--mm-maxheight', `${Math.floor(maxHeight)}px`);
};
