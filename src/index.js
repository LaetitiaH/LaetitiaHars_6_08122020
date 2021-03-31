// Variables initializers
let photographers;
let initialPhotographers;
let filtersList;

// Get photographers list form localhost and launch displayPhotographer and initFilterListener
getPhotographersList().then((res) => {
  initialPhotographers = res.photographers;
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
// DOM
const mainContent = document.querySelector(".main-content");

// Get list of photographers and set initialPhotographers and photographers
function getPhotographersList() {
  return fetch("assets/json/photographers.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .catch(function () {
      this.dataError = true;
    });
}

// Display Filters list

function displayFiltersList() {
  document.querySelector("#filtersList").innerHTML = filtersList
    .map(
      (filter) =>
        `<li class="tag-name" data-checked="false"><a href="#" aria-label="${filter} tag">#${filter}</a></li>`
    )
    .toString()
    .replace(/,/g, "");
}

// Display Photographers list
function displayPhotographersList() {
  const template = document.querySelector("#photograph");

  photographers.forEach(
    ({ city, country, id, name, portrait, price, tagline, tags }) => {
      // initialize template clone of template
      const template_clone = template.content.cloneNode(true);

      // set DOM foreach photographer
      setPhotographersInformations(
        template_clone,
        id,
        name,
        city,
        country,
        price,
        tagline,
        tags
      );
    }
  );

  // init Filter CLick Listeners
  initFilterClickListener();
}

function initFilterClickListener() {
  const tagFilters = document.querySelectorAll(".tag-name");
  tagFilters.forEach((tag) => {
    tag.addEventListener("click", filterPhotographersList);
  });
}

function setPhotographersInformations(
  template,
  id,
  name,
  city,
  country,
  price,
  tagline,
  tags
) {
  const srcImg = `assets/pictures/photographers-photos/${name.replace(
    /-|[" "]/g,
    ""
  )}.jpg`;

  const tagsList = tags
    .map(
      (tag) =>
        `<li aria-label="${tag} tag"><span aria-label="${tag}">#${tag}</span></li>`
    )
    .toString()
    .replace(/,/g, "");

  // Set attribute and text in clone template
  template.querySelector("a").setAttribute("aria-label", name);
  template
    .querySelector("a")
    .setAttribute("href", `photographer-page.html?id=${id}`);
  template.querySelector(".profil-photo_big").setAttribute("src", srcImg);
  template
    .querySelector(".profil-photo_big")
    .setAttribute("alt", `${name} photo`);
  template.querySelector(".profil-title").textContent = name;
  template.querySelector(".localization").textContent = `${city}, ${country}`;
  template.querySelector(".quote").textContent = tagline;
  template.querySelector(".price").textContent = `${price}€/jour`;
  template
    .querySelector(".photographer-tag")
    .setAttribute("aria-label", `${name} personal categories`);
  template.querySelector("ul").innerHTML = tagsList;

  // create Dom elements
  mainContent.appendChild(template);
}

// Filter list of photographers with selected tag
function filterPhotographersList(tag) {
  const allTagFilters = document.querySelectorAll(".tag-name");

  // set attributes to identified selected tag
  const tagFilterState = tag.currentTarget.dataset.checked;
  if (tagFilterState === "true") {
    tag.currentTarget.setAttribute("data-checked", "false");
    tag.currentTarget.removeAttribute("ariaCurrent");
  } else {
    tag.currentTarget.setAttribute("data-checked", "true");
    tag.currentTarget.setAttribute("ariaCurrent", "page");
  }

  // set array with all selected filters
  let tagsfilter = [];
  allTagFilters.forEach((tagFilter) => {
    if (tagFilter.dataset.checked === "true") {
      tagsfilter.push(tagFilter.innerText.replace("#", "").toLowerCase());
    }
  });

  // filter photographers array with selected tag
  if (tagsfilter.length) {
    photographers = initialPhotographers.filter((photographer) =>
      photographer.tags.find((tag) =>
        tagsfilter.find((tagFilter) => tagFilter === tag)
      )
    );
  } else {
    photographers = initialPhotographers;
  }

  // remove all articles html code
  mainContent.childNodes.forEach((child) => {
    if (child.localName === "article") {
      child.remove();
    }
  });

  // launch displayPhotographersList to display filtered photographers list
  displayPhotographersList();
}
