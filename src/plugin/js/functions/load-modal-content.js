import { loadVideo } from './loadvideo.js';
import { loadImage } from './loadimage.js';
import { loadHTML } from './loadhtml.js';

export async function loadModalContent(trigger, modal, options, originalOptions) {

    const modalType = trigger.dataset.modalType;
    const modalUrl = trigger.dataset.modalUrl || trigger.getAttribute('href') || null;
    let modalPadding = options.padding;

    if (trigger.dataset.modalOverlaycolor && trigger.dataset.modalOverlaycolor !== originalOptions.overlaycolor) {
        modal.modalElement.style.setProperty('--mm-overlaycolor', trigger.dataset.modalOverlaycolor);
    }

    if (trigger.dataset.modalClass) {
        modal.modalElement.classList.add(...trigger.dataset.modalClass.split(/[ ,]+/));
    }

    if (modalType == 'html') {

        modalPadding = trigger.dataset.modalPadding || options.padding.html || options.padding;
        if (modalPadding !== originalOptions.padding.html) {
            modal.modalElement.style.setProperty('--mm-modal-padding', modalPadding);
        }

        let modalBackground = trigger.dataset.modalBackground || options.background.html || options.background;
        if (modalBackground !== originalOptions.background.html) {
            modal.modalElement.style.setProperty('--mm-modal-background', modalBackground);
        }

    } else if (modalType == 'iframe') {

        modalPadding = trigger.dataset.modalPadding || options.padding.iframe|| options.padding;
        if (modalPadding !== "0") {
            modal.modalElement.style.setProperty('--mm-modal-padding', modalPadding);
        }

        let modalBackground = trigger.dataset.modalBgcolor || options.background.iframe || options.background;
        if (modalBackground !== originalOptions.background.iframe) {
            modal.modalElement.style.setProperty('--mm-modal-background', modalBackground);
        }

    } else {

        modalPadding = trigger.dataset.modalPadding || options.padding.media || options.padding;
        if (modalPadding !== "0") {
            modal.modalElement.style.setProperty('--mm-modal-padding', modalPadding);
        }

        let modalBackground = trigger.dataset.modalBackground || options.background.media || options.background;
        if (modalBackground !== originalOptions.background.media) {
            modal.modalElement.style.setProperty('--mm-modal-background', modalBackground);
        }
    }

    modal.triggerElement = trigger;

    let modalContent;
    let hasError = false;
    if (modalType === 'video') {
        modalContent = await loadVideo(modalUrl, modal, options);

    } else if (modalType === 'image') {
        let imageModalUrl = (modalUrl && modalUrl != "#" && modalUrl != "#/") ? modalUrl : trigger.firstChild.tagName == "IMG" ? trigger.firstChild.getAttribute('src') : null;
        let imageAlt = trigger.firstChild.tagName == "IMG" ? trigger.firstChild.getAttribute('alt') : null;
        modalContent = await loadImage(imageModalUrl, modal, imageAlt);

    } else if (modalType === 'html') {
        modalContent = await loadHTML(modalUrl, modal);

    } else if (modalType === 'iframe') {
        modalContent = `<iframe class="mm-body" src="${modalUrl}" frameborder="0" allowfullscreen></iframe>`;
        modal.modalElement.dataset.modalType = 'iframe';

    } else {
        console.error('Unknown modal type');
        return;
    }

    if (!modalContent) {
        hasError = true;
    }

    // If there's an error, do not proceed
    if (hasError) {
        return;
    }

    // Set the modal content
    modal.setContent(modalContent, modalType);

    // Show the modal
    modal.show();
}

