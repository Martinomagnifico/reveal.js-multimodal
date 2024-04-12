/**
 * Load an image into the modal.
 * @param {string} url - The URL of the image.
 */
export async function loadImage(url, modal, imageAlt) {
    return new Promise((resolve) => {
        const image = new Image();
        let altAttribute = "";
        if (imageAlt) {
            altAttribute = ` alt="${imageAlt}"`;
        }
        image.onload = () => {
            modal.modalElement.dataset.modalType = 'image';
            resolve(`<img class="mm-body" src="${url}"${altAttribute}>`);
        };
        image.onerror = () => {
            console.error(`Error loading image: ${url}`);
            resolve(null); // Resolve with null if there's an error
        };
        image.src = url;
    });
}