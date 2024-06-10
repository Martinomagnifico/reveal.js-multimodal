
import { loadResource, mergeDeep, pluginPath } from "./helpers.js"
import { createModalContainer } from './functions/createmodal.js';
import { Modal } from './functions/modal.js';
import { setPresetConfigs, spaceEscapeHide, lockNav, unlockNav, isScroller } from './functions/navigation.js';
import { setSize } from './functions/setsize.js';
import { loadModalContent } from './functions/load-modal-content.js';
import { preloadFromSlide } from './functions/preload.js';
import { setupOptions } from './functions/setupoptions.js';

const Plugin = () => {

	let options = {};

	const Multimodal = (deck, options, originalOptions) => {

		const TRIGGERATTRIBUTE = "data-modal-type";
		const CLOSEATTRIBUTE = "data-modal-close";

		const revealEl = deck.getRevealElement();

		const modalClickTriggers = Array.from(revealEl.querySelectorAll(`[${TRIGGERATTRIBUTE}]:not(section)`));
		const revealMargin = deck.getConfig().margin;

		const setupModal = (deck) => {
			const modal = new Modal(deck);

			setPresetConfigs(deck, modal);
			setupOptions(modal, options, originalOptions);
			
			const escapePressed = (event) => {
				if (event.key === 'Escape' || event.keyCode === 27) {
					if (modal.isOpen) { modal.hide() };
				}
			};

			modal.closeButtonHtml = `<button class="mm-close" type="button" aria-hidden="true" ${CLOSEATTRIBUTE} aria-label="Close"><svg class="offset" viewport="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(45 12 12)"><line x1="0" y1="12" x2="24" y2="12"></line><line x1="12" y1="0" x2="12" y2="24"></line></g></svg></button>`;


			const handleModalTrigger = async (event) => {
				event.preventDefault();
				const target = event.currentTarget;
				if (target.hasAttribute('href') && (target.getAttribute('href') === "#" || target.getAttribute('href') === "#/" )) {
					event.stopPropagation();
				}
				await loadModalContent(target, modal, options, originalOptions);
			};

			// Current triggers in the DOM
			modalClickTriggers.forEach(trigger => {
				trigger.addEventListener('click', handleModalTrigger);
			});

			// Future triggers in the DOM
			// Via an observer because delegating through document click event does not work
			const observer = new MutationObserver(mutationsList => {
				mutationsList.forEach(mutation => {
					if (mutation.type === 'childList') {
						mutation.addedNodes.forEach(node => {
							if (node.nodeType === 1 && node.hasAttribute(TRIGGERATTRIBUTE) && node.tagName.toLowerCase() !== 'section') {
								node.addEventListener('click', handleModalTrigger);
							}
						});
					}
				});
			});

			deck.addEventListener("click", async (event) => {
				if (event.target.closest(`[${CLOSEATTRIBUTE}]`) || event.target.closest(`a[href="#multimodal"]`) ) {
					event.preventDefault();
					event.stopPropagation();
					modal.hide();
				}
			});

			const handleModalSlideModal = (slide) => {
				if (slide.dataset.modalType) {
					let whenEvent = slide.dataset.modalEvent ? slide.dataset.modalEvent : options.slidemodalevent;
					return whenEvent;
				}
			};

			deck.on('slidechanged', async (event) => {

				if (modal.isOpen) {
					modal.hide();
				};
	
				preloadFromSlide(event.currentSlide);
	
				if (isScroller(deck)) {
	
					if (event.currentSlide.dataset.modalType && options.slidemodalevent == "slidetransitionend") {
						setTimeout(() => {
							// Timeout needed for when the first slide is a modal slide.
							if (deck.getCurrentSlide() == event.currentSlide) {
								loadModalContent(event.currentSlide, modal, options, originalOptions);
							}
						}, 10);
					}
				} else {

					if (handleModalSlideModal(event.currentSlide) && handleModalSlideModal(event.currentSlide) == "slidechanged") {
						await loadModalContent(event.currentSlide, modal, options, originalOptions);
					}
				}
			});
	
			deck.on('slidetransitionend', async (event) => {

				if (handleModalSlideModal(event.currentSlide) && handleModalSlideModal(event.currentSlide) == "slidetransitionend") {
					await loadModalContent(event.currentSlide, modal, options, originalOptions);
				}

			});
	
			deck.on('ready', async (event) => {
	
				setSize(revealMargin, revealEl, deck.getScale(), modal, options);

				if (handleModalSlideModal(event.currentSlide) && (handleModalSlideModal(event.currentSlide) == "slidetransitionend" || handleModalSlideModal(event.currentSlide) == "slidechanged")) {
					await loadModalContent(event.currentSlide, modal, options, originalOptions);
				}
				

				observer.observe(revealEl, { childList: true, subtree: true });

			});
	
			deck.on('resize', event => {
				setSize(revealMargin, revealEl, event.scale, modal, options);
			});
	

			// Show behaviour
	
			modal.on('multimodal:show', () => {
	
				revealEl.classList.add('multimodal-open');
				document.addEventListener('keydown', escapePressed);
	
				if (!modal.modalElement.closest(".reveal-scroll")) {
					spaceEscapeHide(deck, modal);
				}
	
				const closeOnClickOutside = (event) => {
					if (!modal.isLocked) {
						if (event.target === modal.modalElement || event.target === modal.modalMax) {
							modal.hide();
						}
					}

				};
				modal.modalElement.addEventListener('click', closeOnClickOutside);
				modal.closeOnClickOutside = closeOnClickOutside;
			});
	
			modal.on('multimodal:shown', () => {

				if (modal.triggerElement) {
					if (modal.triggerElement.dataset.modalNavblock && modal.triggerElement.dataset.modalNavblock == "true" ) {
						lockNav(deck, modal);
					}
				}
	
				const video = modal.modalDialog.querySelector('video');
				if (video) {
					if (options.videoautoplay) {
						video.play();
					}
					if (options.videoautohide) {
						video.addEventListener('ended', () => {
							modal.hide();
						});
					}
					video.addEventListener('webkitendfullscreen', function (e) { 
						if (options.debug) {
							console.log('Exited fullscreen');
						}
						modal.hide();
					});
				}
			});
	
			// Hide behaviour
	
			modal.on('multimodal:hide', () => {
				revealEl.classList.remove('multimodal-open');
				if (modal.closeOnClickOutside) {
					modal.modalElement.removeEventListener('click', modal.closeOnClickOutside);
					modal.closeOnClickOutside = null;
				}
	
				unlockNav(deck, modal);
				document.removeEventListener('keydown', escapePressed);
	
				const video = modal.modalDialog.querySelector('video');
				if (video) {
					video.pause();
				}
			});
	
			modal.on('multimodal:hidden', () => {
				modal.modalBody.innerHTML = '';
				const iframe = modal.modalDialog.querySelector('iframe');
				if (iframe) { iframe.src = '' }
				modal.modalElement.style.removeProperty('--mm-modal-background');
				modal.modalElement.style.removeProperty('--mm-overlaycolor');
				modal.modalElement.style.removeProperty('--mm-modal-padding');
				modal.modalElement.style.removeProperty('--mm-outerradius');
			});

			if (options.debug) {
				deck.on('multimodal:shown', () => { console.log('Modal shown'); });
				deck.on('multimodal:hidden', () => { console.log('Modal hidden'); });
				deck.on('multimodal:show', () => { console.log('Modal show'); });
				deck.on('multimodal:hide', () => { console.log('Modal hide'); });
			}
		}

		let modalElement = revealEl.querySelector('.multimodal');

		if ( modalElement ) {
			// There already is a multimodal container
			setupModal(deck);
		  } else {
			// Create a multimodal container
			createModalContainer(deck).then(
				setupModal(deck)
			);
		}

	};

	/**
	* Initialize the plugin
	* @param {object} deck - The deck object
	*/
	const init = (deck) => {

		let defaultOptions = {
			background: {
				html: "var(--r-background-color)",
				iframe: "var(--r-background-color)",
				media: "white"
			},
			bordercolor: "white",
			borderwidth: "1px",
			closebuttonhtml: '',
			cssautoload: true,
			csspath: '',
			htmlminwidth: "100px",
			htmlminheight: "100px",
			overlaycolor: "rgba(0, 0, 0, 0.30)",
			padding: {
				html: "1em",
				iframe: "0",
				media: "0"
			},
			radius: "0.5em",
			scalecorrection: true,
			shadow: "0 0.5em 0.75em 0.5em rgba(0, 0, 0, 0.25)",
			slidemodalevent: "slidetransitionend",
			speed: 300,
			videoautoplay: true,
			videocontrols: true,
			videoautohide: true,
			zoom: true,
			zoomfrom: 0.90
		};

		let originalOptions = JSON.parse(JSON.stringify(defaultOptions))
		options = mergeDeep(defaultOptions, deck.getConfig().multimodal || {});
		options.indexbase = deck.getConfig().hashOneBasedIndex ? 1 : 0;

		if (options.cssautoload) {

			let PluginStylePath = options.csspath.multimodal ? options.csspath.multimodal : options.csspath ? options.csspath : null || `${pluginPath()}multimodal.css` || 'plugin/multimodal/multimodal.css'

			if (options.debug) {
				console.log(`Plugin path = ${pluginPath()}`);
				console.log(`Multimodal CSS path = ${PluginStylePath}`);
			}
	
			const generator = document.querySelector('[name=generator]');
			if (!(generator && generator.content.includes("quarto"))) {
				loadResource(PluginStylePath, 'stylesheet');
			}
		}

		if (options.debug) {
			let style = document.createElement('style');
			style.innerHTML = `.reveal .slides, .scroll-page-content:has(section.present) { box-shadow: inset 0 0 0 1px orange} .mm-max { box-shadow: inset 0 0 0 1px red}`;
			document.head.appendChild(style);
		}

		Multimodal(deck, options, originalOptions);

	};

	return {
		id: 'multimodal',
		init: init
	};
};

export default Plugin;