// Display Sort
const sortButton = document.querySelector(".sort-button");
let itemsSortList = ["Popularité", "Date", "Titre"];
let isSortOpen = false;

displayItemsList();

sortButton.addEventListener("click", toggleSortList);
sortButton.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    toggleSortList(evt);
  }
});

function displayItemsList() {
  addHtmlContent(
    sortButton,
    `<li class="sort-item-list" tabindex="0" role="option" aria-label="Trier par ${itemsSortList[0]}">${itemsSortList[0]}</li><li class="sort-item-list" tabindex="0" role="option" aria-label="Trier par ${itemsSortList[1]}">${itemsSortList[1]}</li><li class="sort-item-list" tabindex="0" role="option" aria-label="Trier par ${itemsSortList[2]}">${itemsSortList[2]}</li>`
  );
}

function toggleSortList(evt) {
  if (isSortOpen === false) {
    evt.preventDefault();
    openSort();
  } else {
    displaySelectedItem(evt);
    closeSort();
  }
}

function displaySelectedItem(evt) {
  const selectedItem = evt.target.textContent || itemsSortList[0];

  displayPhotographerMediaByFilter(selectedItem);

  itemsSortList = itemsSortList.filter((item) => item !== selectedItem);
  itemsSortList.unshift(selectedItem);

  addAttribute(sortButton, "aria-activedescendant", selectedItem);

  displayItemsList();
}

function openSort() {
  isSortOpen = true;
  removeClass(sortButton, "sort-button");
  addClass(sortButton, "buttonCollapsed");
  addAttribute(sortButton, "aria-expanded", true);

  const sortItems = document.querySelectorAll(
    ".buttonCollapsed .sort-item-list"
  );

  sortItems.forEach((sortItem) => {
    toggleClass(sortItem, "itemCollapsed");
  });

  const sortButtonItems = sortButton.querySelector(".sort-item-list");
  sortButtonItems.focus();
}

function closeSort() {
  const sortItemsCollapsed = document.querySelectorAll(".itemCollapsed");
  sortItemsCollapsed.forEach((sort) => {
    removeClass(sort, "itemCollapsed");
  });

  removeClass(sortButton, "buttonCollapsed");
  addClass(sortButton, "sort-button");
  addAttribute(sortButton, "aria-expanded", false);
  isSortOpen = false;
}

function displayPhotographerMediaByFilter(selectedItem) {
  if (selectedItem === "Popularité") {
    photographer.sortMediaByLikes();
  } else if (selectedItem === "Date") {
    photographer.sortMediaByDate();
  } else {
    photographer.sortMediaByTitle();
  }

  // remove all articles html code
  const picturesList = document.querySelector(".profil-pictures-list");
  picturesList.childNodes.forEach((child) => {
    if (child.localName === "article") {
      child.remove();
    }
  });

  displayPicturesList();
  initLikesListenerClick();
}
