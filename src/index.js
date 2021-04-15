// Variables initializers
let photographers;
let initialPhotographers;
let filtersList;

// DOM
const mainContent = document.querySelector(".main-content");

// Get photographers list form localhost and launch displayPhotographer and initFilterListener
getPhotographersListWithMedia().then((photographersList) => {
  initialPhotographers = photographersList;

  photographers = initialPhotographers;
  filtersList = Array.from(
    new Set(
      photographers
        .map((photographer) => photographer.tags)
        .reduce((acc, tags) => {
          return acc.concat(tags);
        })
    )
  );
  displayFiltersList();
  displayPhotographersList();
});

// Display Photographers list
function displayPhotographersList() {
  const template = document.querySelector("#photograph");

  photographers.forEach((photographerInfo) => {
    // initialize template clone of template
    const template_clone = template.content.cloneNode(true);
    const photographerInformations = factory.createPhotographer(
      photographerInfo
    );

    // set DOM foreach photographer
    setPhotographersInformations(template_clone, photographerInformations);
  });
}

function setPhotographersInformations(template, photographerInformations) {
  addPhotographerPageLink(template, photographerInformations);
  displayProfilPhotographerInformations(template, photographerInformations);
  displayBigPhotoPhotographerInformations(template, photographerInformations);

  // create Dom elements
  mainContent.appendChild(template);
}

function addPhotographerPageLink(template, photographerInformations) {
  const photographerLink = template.querySelector("a");

  addAttribute(photographerLink, "aria-label", photographerInformations.name);
  addAttribute(
    photographerLink,
    "href",
    `photographer-page.html?id=${photographerInformations.id}`
  );
}
