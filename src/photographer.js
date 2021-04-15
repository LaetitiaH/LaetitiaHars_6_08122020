// Get photographer info and create photographer object
let photographer;
const photographerId = +window.location.search.split("=")[1];

getPhotographersList().then((res) => {
  const photographersList = res.photographers;
  const picturesList = res.media;
  const photographerWithPictures = photographersList
    .map((photographer) => {
      const photographerPicture = picturesList.filter(
        (picture) => picture.photographerId === photographer.id
      );
      return { ...photographer, media: photographerPicture };
    })
    .find((photographer) => photographer.id === photographerId);

  photographer = factory.createPhotographer(photographerWithPictures);
  displayPhotographerInformations();
  displayPicturesList();
});

function displayPhotographerInformations() {
  displayProfilPhotographerInformations(photographer);
  displayPhotoPhotographerInformations(photographer);

  const likesNumber = document.querySelector("#likesNumber");
  addTextContent(likesNumber, photographer.getTotalLike());
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
  if (media.image) {
    mediaToInsert = `<img class="photographer-picture" src="${media.getImgSrcFormatted()}" alt="${media.getImgName()}" />`;
  } else {
    mediaToInsert = `<video class="photographer-picture" controls>
    <source src=${media.getVideoSrcFormatted()}
            type="video/mp4">
</video>`;
  }
  const mediaContent = template.querySelector(".media");
  const mediaTitle = template.querySelector("h2");
  const mediaPrice = template.querySelector("#picture-price");
  const mediaLikes = template.querySelector("#picture-likes");
  // Set attribute and text in clone template
  addHtmlContent(mediaContent, mediaToInsert);
  addTextContent(mediaTitle, media.getImgName());
  addTextContent(mediaPrice, `${media.price} €`);
  addTextContent(mediaLikes, media.likes);

  // create Dom elements

  const picturesList = document.querySelector(".profil-pictures-list");
  picturesList.appendChild(template);
}
