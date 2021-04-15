function addAttribute(selecteur, attribute, value) {
  selecteur.setAttribute(attribute, value);
}

function removeAttribute(selecteur, attribute) {
  selecteur.removeAttribute(attribute);
}

function addTextContent(selecteur, value) {
  selecteur.textContent = value;
}

function addHtmlContent(selecteur, value) {
  selecteur.innerHTML = value;
}

function removeClass(selecteur, value) {
  selecteur.classList.remove(value);
}

function addClass(selecteur, value) {
  selecteur.classList.add(value);
}

function toggleClass(selecteur, value) {
  selecteur.classList.toggle(value);
}

function displayProfilPhotographerInformations(element, value) {
  const profilTitle = element.querySelector(".profil-title");
  const profilLocalization = element.querySelector(".localization");
  const profilQuote = element.querySelector(".quote");
  const profilPrice = element.querySelector("#price");
  const profilTag = element.querySelector(".photographer-tag");
  const profilTagsList = element.querySelector("ul");

  addTextContent(profilTitle, value.name);
  addTextContent(profilLocalization, value.getFormattedLocalization());
  addTextContent(profilQuote, value.tagline);

  addAttribute(profilTag, "aria-label", `${value.name} personal categories`);

  const tagsList = value.tags
    .map(
      (tag) =>
        `<li aria-label="${tag} tag"><span aria-label="${tag}">#${tag}</span></li>`
    )
    .toString()
    .replace(/,/g, "");

  addHtmlContent(profilTagsList, tagsList);
  addTextContent(profilPrice, `${value.price}€ / jour`);
}

function displayBigPhotoPhotographerInformations(element, value) {
  const profilPhotoBig = element.querySelector(".profil-photo_big");

  addAttribute(profilPhotoBig, "src", value.getFormattedImg());
  addAttribute(profilPhotoBig, "alt", `${value.name} photo`);
}

function displaySmallPhotoPhotographerInformations(element, value) {
  const profilPhotoSmall = element.querySelector(".profil-photo_small");

  addAttribute(profilPhotoSmall, "src", value.getFormattedImg());
  addAttribute(profilPhotoSmall, "alt", `${value.name} photo`);
}
