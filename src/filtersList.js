let tagsfilter = [];
// Display Filters list

function displayFiltersList() {
  const filtersListSelector = document.querySelector("#filtersList");
  const filtersListContent = filtersList
    .map(
      (filter) =>
        `<li class="tag-name" data-checked="false"><a href="#" aria-label="${filter} tag">#${filter}</a></li>`
    )
    .toString()
    .replace(/,/g, "");

  addHtmlContent(filtersListSelector, filtersListContent);

  // init Filter CLick Listeners
  initFilterClickListener();
}

function initFilterClickListener() {
  const tagFilters = document.querySelectorAll(".tag-name");
  tagFilters.forEach((tag) => {
    tag.addEventListener("click", filterPhotographersList);
  });
}

// Filter list of photographers with selected tag
function filterPhotographersList(tag) {
  const allTagFilters = document.querySelectorAll(".tag-name");

  identifySelectedTag(tag);

  filterPhotographers(allTagFilters);

  // remove all articles html code
  mainContent.childNodes.forEach((child) => {
    if (child.localName === "article") {
      child.remove();
    }
  });

  // launch displayPhotographersList to display filtered photographers list
  displayPhotographersList();
}

// set attributes to identified selected tag
function identifySelectedTag(tag) {
  const tagFilterState = tag.currentTarget.dataset.checked;
  const currentTag = tag.currentTarget;
  if (tagFilterState === "true") {
    addAttribute(currentTag, "data-checked", "false");
    removeAttribute(currentTag, "ariaCurrent");
  } else {
    addAttribute(currentTag, "data-checked", "true");
    addAttribute(currentTag, "ariaCurrent", "page");
  }
}

function filterPhotographers(allTagFilters) {
  listSelectedTag(allTagFilters);
  filterPhotographersWithSelectedTags();
}

// set array with all selected filters
function listSelectedTag(allTagFilters) {
  allTagFilters.forEach((tagFilter) => {
    if (tagFilter.dataset.checked === "true") {
      tagsfilter.push(tagFilter.innerText.replace("#", "").toLowerCase());
    }
  });
}

// filter photographers array with selected tag
function filterPhotographersWithSelectedTags() {
  if (tagsfilter.length) {
    photographers = initialPhotographers.filter((photographer) =>
      photographer.tags.find((tag) =>
        tagsfilter.find((tagFilter) => tagFilter === tag)
      )
    );
  } else {
    photographers = initialPhotographers;
  }
  tagsfilter = [];
}
