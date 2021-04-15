function addAttribute(selecteur, attribute, value) {
  selecteur.setAttribute(attribute, value);
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

function displayProfilPhotographerInformations(value) {
  const profilTitle = document.querySelector(".profil-title");
  const profilLocalization = document.querySelector(".localization");
  const profilQuote = document.querySelector(".quote");
  const profilPrice = document.querySelector("#price");
  const profilTag = document.querySelector(".photographer-tag");
  const profilTagsList = document.querySelector("ul");

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

function displayPhotoPhotographerInformations(value) {
  const profilPhotoBig = document.querySelector(".profil-photo_big");
  const profilPhotoSmall = document.querySelector(".profil-photo_small");

  addAttribute(profilPhotoBig, "src", value.getFormattedImg());
  addAttribute(profilPhotoSmall, "src", value.getFormattedImg());
  addAttribute(profilPhotoBig, "alt", `${value.name} photo`);
  addAttribute(profilPhotoSmall, "alt", `${value.name} photo`);
}
