// Get photographer info and create photographer object
let photographer;
const photographerId = +window.location.search.split("=")[1];

getPhotographersListWithMedia().then((photographersList) => {
  const photographerToDisplay = photographersList.find(
    (photographer) => photographer.id === photographerId
  );

  photographer = factory.createPhotographer(photographerToDisplay);
  displayPhotographerInformations();
  displayPicturesList();
  initLikesListenerClick();
});

function displayPhotographerInformations() {
  displayProfilPhotographerInformations(document, photographer);
  displayBigPhotoPhotographerInformations(document, photographer);
  displaySmallPhotoPhotographerInformations(document, photographer);
  displayLikesNumber();
}

function displayPicturesList() {
  const template = document.querySelector("#photograph-picture");

  photographer.media.forEach((photographerMedia) => {
    // initialize template clone of template
    const template_clone = template.content.cloneNode(true);
    const media = factory.createMedia(photographerMedia);

    // set DOM foreach pictures
    displayPicture(template_clone, media);
  });
}

function displayPicture(template, media) {
  let mediaToInsert;
  if (media.type === "img") {
    mediaToInsert = `<img class="photographer-picture" src="${media.getImgSrcFormatted()}" alt="${
      media.description
    }" />`;
  } else {
    mediaToInsert = `<video class="photographer-picture" controls>
    <source src=${media.getVideoSrcFormatted()}
            type="video/mp4">
</video>`;
  }
  const mediaContent = template.querySelector(".media");
  const mediaTitle = template.querySelector("h2");
  const mediaPrice = template.querySelector(".picture-price");
  const mediaLikes = template.querySelector(".picture-likes");
  const likeButton = template.querySelector(".heart-button");
  // Set attribute and text in clone template
  addHtmlContent(mediaContent, mediaToInsert);
  addTextContent(mediaTitle, media.name);
  addTextContent(mediaPrice, `${media.price} €`);
  addTextContent(mediaLikes, media.likes);
  addAttribute(likeButton, "data-media-Id", media.id);
  addAttribute(mediaContent, "aria-label", media.name);
  addAttribute(mediaContent, "data-media-Id", media.id);

  // create Dom elements

  const picturesList = document.querySelector(".profil-pictures-list");
  picturesList.appendChild(template);

  const mediaContentAll = document.querySelectorAll(".media");

  initMediaModalListenerCLick(mediaContentAll, photographer);
}
