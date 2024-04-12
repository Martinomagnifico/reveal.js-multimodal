const MODAL_ELEMENT_ID = '.multimodal';
const MODAL_DIALOG_CLASS = '.mm-dialog';
const MODAL_CONTENT_CLASS = '.mm-content';
const MODAL_BODY_CLASS = '.mm-body';
const SHOWN_CLASS = 'shown';
const SHOW_CLASS = 'show';

const EVENT_SHOW = 'multimodal:show';
const EVENT_SHOWN = 'multimodal:shown';
const EVENT_HIDE = 'multimodal:hide';
const EVENT_HIDDEN = 'multimodal:hidden';

export class Modal {

    constructor() {
        this.isOpen = false; // Initialize isOpen flag
        this.modalElement = deck.querySelector(".multimodal");
        this.modalDialog = this.modalElement.querySelector(MODAL_DIALOG_CLASS);
        this.modalContent = this.modalElement.querySelector(MODAL_CONTENT_CLASS);
        this.modalBody = this.modalElement.querySelector(MODAL_BODY_CLASS);
        this.modalElement.style.setProperty('display', 'none');
        this.modalElement.setAttribute('aria-hidden', 'true');
        this.eventListeners = {};
        this.presetConfigs = {};
        this.closeButtonHtml = '';
        this.deck = deck;

        // Add transitionend event listener
        this.modalElement.addEventListener('transitionend', (event) => {
            // Avoid triggering the event when the transition is not for the modal itself
            if (event.target == this.modalElement) {
                if (!this.isOpen) {
                    // Modal is hidden
                    this.modalElement.classList.remove(SHOWN_CLASS);
                    this.modalElement.classList.remove(SHOW_CLASS);
                    this.modalElement.style.setProperty('display', 'none');
                    this.trigger(EVENT_HIDDEN);
                } else {
                    // Modal is shown
                    this.modalElement.classList.add(SHOWN_CLASS);
                    this.trigger(EVENT_SHOWN);
                }
            }
        });
    }

    on(event, listener) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(listener);
    }

    trigger(event, action = 'show', ...args) {
        const listeners = this.eventListeners[event];
        if (listeners) {
            listeners.forEach(listener => listener(action, ...args));
        }
        const customEvent = new CustomEvent(event, { detail: { action, trigger: this.triggerElement, args } });
        this.deck.dispatchEvent(customEvent);
    }

    show() {
        this.isOpen = true;
        this.modalElement.style.removeProperty('display');
        this.modalElement.removeAttribute('aria-hidden');

        // Check for transition duration, if no transitions add both show and shown classes
        if (window.getComputedStyle(this.modalElement).getPropertyValue('transition-duration') === '0s') {
            this.modalElement.classList.add(SHOW_CLASS);
            this.trigger(EVENT_SHOW);
            this.modalElement.classList.add(SHOWN_CLASS);
            this.trigger(EVENT_SHOWN);
        } else {
            // Just add the show class. 
            // Because there is a transition, this will trigger the shown event at the end of the transition.
            setTimeout(() => {
                this.modalElement.classList.add(SHOW_CLASS);
                this.trigger(EVENT_SHOW);
            }, 10);
        }
    }

    hide() {
        this.isOpen = false;
        this.trigger(EVENT_HIDE);

        // Hide modal
        this.modalElement.setAttribute('aria-hidden', 'true');
        if (window.getComputedStyle(this.modalElement).getPropertyValue('transition-duration') === '0s') {
            this.modalElement.classList.remove(SHOWN_CLASS);
            this.modalElement.classList.remove(SHOW_CLASS);
            this.modalElement.style.setProperty('display', 'none');
            this.trigger(EVENT_HIDDEN, 'hide', this.triggerInfo);
        } else {
            this.modalElement.classList.remove(SHOW_CLASS);
        }
    }


    setContent(content, type) {
        let htmlString = content;
        if (type == "html") {
            htmlString = `<div class="mm-body">${content}</div>`
        }

        this.modalContent.innerHTML = this.closeButtonHtml + htmlString;
    }
}
