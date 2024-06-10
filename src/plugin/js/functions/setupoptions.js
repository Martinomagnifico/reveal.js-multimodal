export async function setupOptions(modal, options, originalOptions) {

    // Options for all modals

    if (options.closebuttonhtml !== '') {
        modal.closeButtonHtml = options.closebuttonhtml;
    }
    if (options.overlaycolor !== originalOptions.overlaycolor) {
        modal.modalElement.style.setProperty('--mm-overlaycolor', options.overlaycolor);
    }
    if (options.speed !== originalOptions.speed) {
        let speed = options.speed / 1000;
        modal.modalElement.style.setProperty('--mm-transspeed', `${speed}s`);
    }

    if (options.htmlminwidth !== originalOptions.htmlminwidth) {
        let newWidth = !isNaN(options.htmlminwidth) ? `${options.htmlminwidth}px` : options.htmlminwidth;
        modal.modalElement.style.setProperty('--mm-minwidth', newWidth);
    }
    if (options.htmlminheight !== originalOptions.htmlminheight) {
        let newHeight = !isNaN(options.htmlminheight) ? `${options.htmlminheight}px` : options.htmlminheight;
        modal.modalElement.style.setProperty('--mm-minheight', newHeight);
    }

    if (options.radius !== originalOptions.radius) {
        modal.modalElement.style.setProperty('--mm-outerradius', options.radius);
    }

    if (options.bordercolor !== originalOptions.bordercolor) {
        modal.modalElement.style.setProperty('--mm-bordercolor', options.bordercolor);
    }

    if (options.borderwidth !== originalOptions.borderwidth) {
        modal.modalElement.style.setProperty('--mm-borderwidth', options.borderwidth);
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
