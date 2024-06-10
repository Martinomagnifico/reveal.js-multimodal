export function createModalContainer(deck) {
  return new Promise((resolve, reject) => {
    // Define the modal container HTML using template literals
    const modalContainerHTML = `
      <div class="multimodal" id="multimodal" aria-hidden="true">
        <div class="mm-max">
          <div class="mm-dialog">
            <button class="mm-close" type="button" aria-hidden="true" data-modal-close="true" aria-label="Close"><svg class="offset" viewport="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(45 12 12)"><line x1="0" y1="12" x2="24" y2="12"></line><line x1="12" y1="0" x2="12" y2="24"></line></g></svg></button>
            <div class="mm-body"></div>
          </div>
        </div>
      </div>
    `;

    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalContainerHTML;

    const slidesElement = deck.getSlidesElement();
    slidesElement.insertAdjacentHTML('afterend', modalContainerHTML);

    resolve();
  });
}
