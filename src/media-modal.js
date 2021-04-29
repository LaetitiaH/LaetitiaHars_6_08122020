// DOM Elements

const body = document.querySelector("body");
const mainContent = document.querySelector("main");
const mediaModal = document.querySelector(".media-modal");
const closeButton = document.querySelector(".modal-close-button");
const nextButton = document.querySelector(".next-media-button");
const previousButton = document.querySelector(".previous-media-button");
const media = document.querySelector(".media");

// Variables

let photographerMedias;
let currentMediaDisplayed;
let initialMediaSelected;

// Init listener on click on one media
function initMediaModalListenerCLick(mediaContentAll, photographer) {
  mediaContentAll.forEach((media) => {
    media.addEventListener("click", (evt) => {
      const selectedElement = evt.currentTarget;
      onOpenModal(selectedElement);
    });
  });

  photographerMedias = photographer.media;
}

// Init listener on click on close button
closeButton.addEventListener("click", onCLoseModal);

// Init listener on press escape on media modal
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape" && modal.ariaHidden === "false") {
    onCLoseModal();
  }
});

// Init listener on click on next button modal
nextButton.addEventListener("click", () => {
  displayNextMedia();
});

// Init listener on click on previous button modal
previousButton.addEventListener("click", () => {
  displayPreviousMedia();
});

// Init listener on press arrow right or left on media modal
document.addEventListener("keydown", (evt) => {
  if (evt.key === "ArrowRight" && mediaModal.ariaHidden === "false") {
    displayNextMedia();
  }
  if (evt.key === "ArrowLeft" && mediaModal.ariaHidden === "false") {
    displayPreviousMedia();
  }
});

// Display Media modal with title and pictures
function onOpenModal(selectedElement) {
  currentMediaDisplayed = selectedElement;
  initialMediaSelected = currentMediaDisplayed;
  const mediaIDSelected = +selectedElement.dataset.mediaId;
  const mediaSelectedWithInfo = factory.createMedia(
    photographerMedias.find((media) => media.id === mediaIDSelected)
  );

  displayAccessibilityAttributes();
  displayMediaTitle(mediaSelectedWithInfo);
  displayMedia(mediaSelectedWithInfo);

  mediaModal.style.display = "flex";
}

// Close modal
function onCLoseModal() {
  mediaModal.style.display = "none";
  removeAccessibilityAttributes();
}

// Display next media on click on right arrow
function displayNextMedia() {
  const currentMediaIndex = findCurrentMediaIndex();

  const nextMediaIndex =
    currentMediaIndex + 1 < photographerMedias.length
      ? currentMediaIndex + 1
      : 0;

  const nextMedia = factory.createMedia(photographerMedias[nextMediaIndex]);

  displayMediaTitle(nextMedia);
  displayMedia(nextMedia);
}

// Display previous media on click on left arrow
function displayPreviousMedia() {
  const currentMediaIndex = findCurrentMediaIndex();

  const previousMediaIndex =
    !currentMediaIndex - 1
      ? currentMediaIndex - 1
      : photographerMedias.length - 1;

  const previousMedia = factory.createMedia(
    photographerMedias[previousMediaIndex]
  );

  displayMediaTitle(previousMedia);
  displayMedia(previousMedia);
}

// Utils functions

function displayAccessibilityAttributes() {
  addAttribute(currentMediaDisplayed, "data-checked", "true");
  addAttribute(mainContent, "aria-hidden", "true");
  addAttribute(mediaModal, "aria-hidden", "false");
  addClass(body, "no-scroll");
  removeClass(body, "body");
  closeButton.focus();
}

function removeAccessibilityAttributes() {
  addAttribute(mainContent, "aria-hidden", "false");
  addAttribute(mediaModal, "aria-hidden", "true");
  removeClass(body, "no-scroll");
  addClass(body, "body");
  addAttribute(currentMediaDisplayed, "data-checked", "false");
  initialMediaSelected.focus();
}

function displayMediaTitle(mediaSelectedWithInfo) {
  const modalTitle = document.querySelector(".modal-title");
  addTextContent(modalTitle, mediaSelectedWithInfo.name);
}

function displayMedia(mediaSelectedWithInfo) {
  mediaSelectedWithInfo.type === "img"
    ? addHtmlContent(
        media,
        `<img class="media-look-up" src="${mediaSelectedWithInfo.getImgSrcFormatted()}" alt="${
          mediaSelectedWithInfo.name
        }" />`
      )
    : addHtmlContent(
        media,
        `<video class="media-look-up" controls>
    <source src=${mediaSelectedWithInfo.getVideoSrcFormatted()}
            type="video/mp4">
</video>`
      );

  const modalImg = document.querySelector(".media-look-up");
  addAttribute(modalImg, "data-media-Id", mediaSelectedWithInfo.id);
}

function findCurrentMediaIndex() {
  const currentMedia = document.querySelector(".media-look-up");
  const currentMediaId = +currentMedia.dataset.mediaId;
  return photographerMedias.findIndex((media) => media.id === currentMediaId);
}
