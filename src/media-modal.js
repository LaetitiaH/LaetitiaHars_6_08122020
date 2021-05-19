// DOM Elements

const body = document.querySelector("body");
const mainContent = document.querySelector("main");
const mediaModal = document.querySelector(".media-modal");
const closeButton = document.querySelector(".modal-close-button");
const nextButton = document.querySelector(".next-media-button");
const previousButton = document.querySelector(".previous-media-button");
const media = document.querySelector(".media");
const title = document.querySelector("#titre");

// Variables

let photographerMedias;
let currentMediaDisplayed;
let initialMediaSelected;

// Init listener on click on one media
function initMediaModalListenerCLick(mediaContentAll, photographer) {
  mediaContentAll.forEach((media) => {
    media.addEventListener("click", (evt) => {
      const selectedElement = evt.currentTarget;
      onOpenMediaModal(selectedElement);
    });
  });

  photographerMedias = photographer.media;
}

// Init listener on click on close button
closeButton.addEventListener("click", onCLoseMediaModal);

// Init listener on press escape on media modal
document.addEventListener("keydown", (evt) => {
  if (
    evt.key === "Escape" &&
    mediaModal.getAttribute("aria-hidden") === "false"
  ) {
    onCLoseMediaModal();
  }
});

// Init listener on click on next button modal
nextButton.addEventListener("click", () => {
  displayNextMedia();
});

// Init listener on click on previous button modal
previousButton.addEventListener("click", (previousButton) => {
  displayPreviousMedia();
});

// Init listener on press arrow right or left on media modal
document.addEventListener("keydown", (evt) => {
  if (
    evt.key === "ArrowRight" &&
    mediaModal.getAttribute("aria-hidden") === "false"
  ) {
    displayNextMedia();
  }
  if (
    evt.key === "ArrowLeft" &&
    mediaModal.getAttribute("aria-hidden") === "false"
  ) {
    displayPreviousMedia();
  }
});

// Change focus on closebutton on last clickable element
nextButton.addEventListener("keydown", (evt) => {
  if (evt.key === "Tab" && !mediaModal.ariaHidden) {
    evt.preventDefault();
    closeButton.focus();
  }
});

// Display Media modal with title and pictures
function onOpenMediaModal(selectedElement) {
  currentMediaDisplayed = selectedElement;
  initialMediaSelected = currentMediaDisplayed;
  const mediaIDSelected = +selectedElement.dataset.mediaId;
  const mediaSelectedWithInfo = factory.createMedia(
    photographerMedias.find((media) => media.id === mediaIDSelected)
  );

  displayMediaAccessibilityAttributes(mediaSelectedWithInfo);
  displayMediaTitle(mediaSelectedWithInfo);
  displayMedia(mediaSelectedWithInfo);

  mediaModal.style.display = "flex";
}

// Close modal
function onCLoseMediaModal() {
  mediaModal.style.display = "none";
  removeMediaAccessibilityAttributes();
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
  displayMediaAccessibilityAttributes(nextMedia);
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
  displayMediaAccessibilityAttributes(previousMedia);
}

// Utils functions

function displayMediaAccessibilityAttributes(mediaSelectedWithInfo) {
  addAttribute(currentMediaDisplayed, "data-checked", "true");
  addAttribute(mainContent, "aria-hidden", "true");
  addAttribute(mediaModal, "aria-hidden", "false");
  displayLinkAccessibilityTitleAttributes(mediaSelectedWithInfo);
  addClass(body, "no-scroll");
  removeClass(body, "body");
  closeButton.focus();
}

// Display accessibility Title on modal
function displayLinkAccessibilityTitleAttributes(media) {
  addAttribute(mediaModal, "aria-labelledby", media.name);
  addAttribute(title, "id", media.name);
}

function removeMediaAccessibilityAttributes() {
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
