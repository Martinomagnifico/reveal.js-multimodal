
export async function setupOptions(modal, options, originalOptions) {


    // Options for all modals

    if (options.closebuttonhtml !== '') {
        modal.closeButtonHtml = options.closebuttonhtml;
    }
    if (options.overlaycolor !== originalOptions.overlaycolor) {
        modal.modalElement.style.setProperty('--mm-overlaycolor', trigger.dataset.modalOverlaycolor);
    }
    if (options.speed !== originalOptions.speed) {
        let speed = options.speed / 1000;
        modal.modalElement.style.setProperty('--mm-transspeed', `${speed}s`);
    }
    if (options.htmlminwidth !== originalOptions.htmlminwidth) {
        modal.modalElement.style.setProperty('--mm-minwidth', `${options.htmlminwidth}px`);
    }
    if (options.htmlminheight !== originalOptions.htmlminheight) {
        modal.modalElement.style.setProperty('--mm-minheight', `${options.htmlminheight}px`);
    }

    if (options.radius !== originalOptions.radius) {
        modal.modalElement.style.setProperty('--mm-outerradius', options.radius);
    }
    if (options.border !== originalOptions.border) {
        modal.modalElement.style.setProperty('--mm-border', options.border);
    }
    if (options.shadow !== originalOptions.shadow) {
        modal.modalElement.style.setProperty('--mm-shadow', options.shadow);
    }
    if (options.zoom) {
        if (options.zoomfrom !== originalOptions.zoomfrom) {
            modal.modalElement.style.setProperty('--mm-initialscale', options.zoomfrom);
        }
    } else {
        modal.modalElement.style.setProperty('--mm-initialscale', 1);
    }
}
