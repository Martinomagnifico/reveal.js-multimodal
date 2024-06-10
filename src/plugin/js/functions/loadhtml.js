import { marked } from 'marked';

export function loadHTML(source, modal) {
    return new Promise(async (resolve, reject) => {
        try {
            let htmlString;

            // Check if the source is a URL string
            if (typeof source === 'string') {

                if (source.startsWith('#')) {

                    const targetElement = document.querySelector(source);
                    if (!targetElement) {

                        throw new Error('Anchor element with specified ID not found.');
                        
                    } else {

                        if (targetElement.firstElementChild.tagName.toLowerCase() === 'section') {
                            htmlString = targetElement.firstElementChild.innerHTML;
                        } else {
                            htmlString = targetElement.innerHTML;
                        }

                        modal.modalElement.dataset.modalType = 'html';
                    }

                } else if (source.endsWith('.md')) {

                    const response = await fetch(source);
                    if (!response.ok) {
                        throw new Error('Failed to fetch MD content.');
                    }
                    const md = await response.text();
                    modal.modalElement.dataset.modalType = 'html';
                    htmlString = marked(md);

                } else if (source.endsWith('.html')) {

                    const response = await fetch(source);
                    if (!response.ok) {
                        throw new Error('Failed to fetch HTML content.');
                    }
                    htmlString = await response.text();
                    modal.modalElement.dataset.modalType = 'html';
                } else {
                    throw new Error('Unsupported HTML content source.');
                }
            } else {
                throw new Error('Invalid HTML content source. Must be a URL string or an anchor element.');
            }

            

            resolve(htmlString);
        } catch (error) {
            console.error('Error loading HTML content:', error);
            reject(error);
        }
    });
}
