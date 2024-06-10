const MODAL_ELEMENT_CLASS = 'multimodal';
const MODAL_MAX_CLASS = 'mm-max';
const MODAL_DIALOG_CLASS = 'mm-dialog';
const MODAL_BODY_CLASS = 'mm-body';
const SHOWN_CLASS = 'shown';
const SHOW_CLASS = 'show';

const EVENT_SHOW = 'multimodal:show';
const EVENT_SHOWN = 'multimodal:shown';
const EVENT_HIDE = 'multimodal:hide';
const EVENT_HIDDEN = 'multimodal:hidden';

export class Modal {

    constructor(deck) {

        this.isOpen = false; // Initialize isOpen flag
        this.modalElement = deck.getRevealElement().querySelector(`.${MODAL_ELEMENT_CLASS}`);
        this.modalMax = this.modalElement.querySelector(`.${MODAL_MAX_CLASS}`);
        this.modalDialog = this.modalElement.querySelector(`.${MODAL_DIALOG_CLASS}`);
        this.modalBody = this.modalElement.querySelector(`.${MODAL_BODY_CLASS}`);
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
                    this.trigger(EVENT_HIDDEN, "hidden");

                    // Remove all classes except the normal modal classes. This is for the added classes by the user.
                    this.modalElement.classList.forEach((className) => {
                        if (className !== MODAL_ELEMENT_CLASS && className !== SHOW_CLASS && className !== SHOWN_CLASS && className !== 'hide' && className !== 'hidden') {
                            this.modalElement.classList.remove(className);
                        }
                    });


                } else {
                    // Modal is shown
                    this.modalElement.classList.add(SHOWN_CLASS);
                    this.trigger(EVENT_SHOWN, "shown");
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
        let details = {
            action,
            trigger: this.triggerElement,
            modal: this.modalElement,
            dialog: this.modalDialog,
            body: this.modalDialog.querySelector(`.${MODAL_BODY_CLASS}`),
            args
        };
        const customEvent = new CustomEvent(event, { detail: details });
        this.modalElement.dispatchEvent(customEvent);
    }

    show() {
        this.isOpen = true;
        this.modalElement.style.removeProperty('display');
        this.modalElement.removeAttribute('aria-hidden');

        // Check for transition duration, if no transitions add both show and shown classes
        if (window.getComputedStyle(this.modalElement).getPropertyValue('transition-duration') === '0s') {
            this.modalElement.classList.add(SHOW_CLASS);
            this.trigger(EVENT_SHOW, "show");
            this.modalElement.classList.add(SHOWN_CLASS);
            this.trigger(EVENT_SHOWN, "shown");
        } else {
            // Just add the show class. 
            // Because there is a transition, this will trigger the shown event at the end of the transition.
            setTimeout(() => {
                this.modalElement.classList.add(SHOW_CLASS);
                this.trigger(EVENT_SHOW, "show");
            }, 10);
        }
    }

    hide() {
        this.isOpen = false;
        this.trigger(EVENT_HIDE, "hide");

        // Hide modal
        this.modalElement.setAttribute('aria-hidden', 'true');
        if (window.getComputedStyle(this.modalElement).getPropertyValue('transition-duration') === '0s') {
            this.modalElement.classList.remove(SHOWN_CLASS);
            this.modalElement.classList.remove(SHOW_CLASS);
            this.modalElement.style.setProperty('display', 'none');
            this.trigger(EVENT_HIDDEN, 'hide');
        } else {
            this.modalElement.classList.remove(SHOW_CLASS);
        }
    }


    setContent(content, type) {
        let htmlString = content;
        if (type == "html") {
            htmlString = `<div class="mm-body"><div class="mm-scrollbody">${content}</div></div>`
        }

        this.modalDialog.innerHTML = this.closeButtonHtml + htmlString;
    }
}
