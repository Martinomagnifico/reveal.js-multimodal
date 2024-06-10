import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock-upgrade';

export const setPresetConfigs = (deck, modal) => {
    modal.presetConfigs = {
        keyboard: deck.getConfig().keyboard,
        mouseWheel: deck.getConfig().mouseWheel,
        scrollProgress: deck.getConfig().scrollProgress
    };
};

export const isScroller = (deck) => {
    if (deck.getRevealElement().closest(".reveal-scroll")) {
        return true;
    } else {
        return false;
    }
}

export const spaceEscapeHide = (deck, modal) => {

    if (modal.modalElement.dataset.modalType == "video") {

        const video = modal.modalDialog.querySelector('video');
        if (video) {
            deck.configure({
                keyboard: { 
                    27: () => { modal.hide() },
                    32: () => { 
                        if (video.paused) {
                            video.play();
                        } else {
                            video.pause();
                        }
                     }
                }
            });
        }
    } else {
        deck.configure({
            keyboard: { 
                27: () => { modal.hide() },
                32: () => { modal.hide() }
            }
        });
    }
};

export const lockNav = (deck, modal) => {

    if (modal.modalElement) {
        disableBodyScroll(modal.modalElement);
    }

    if (!isScroller(deck)) {

        deck.configure({
            keyboard: false,
            mouseWheel: false,
            scrollProgress: false
        });
    }
    modal.isLocked = true;
};

export const unlockNav = (deck, modal) => {

    if (modal.modalElement) {
        enableBodyScroll(modal.modalElement);
    }



    if (!isScroller(deck)) {
        deck.configure({
            keyboard: modal.presetConfigs.keyboard,
            mouseWheel: modal.presetConfigs.mouseWheel,
            scrollProgress: modal.presetConfigs.scrollProgress
        });
    }
    modal.isLocked = false;
};
