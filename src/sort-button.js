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
    `<span tabindex="0" aria-selected="true" role="listbox" aria-label="Trier par ${itemsSortList[0]}" aria-labelledby="Trier par ${itemsSortList[0]}">${itemsSortList[0]}</span><span tabindex="0" role="listbox" aria-label="Trier par ${itemsSortList[1]}" aria-labelledby="Trier par ${itemsSortList[1]}">${itemsSortList[1]}</span><span tabindex="0" role="listbox" aria-label="Trier par ${itemsSortList[2]}" aria-labelledby="Trier par ${itemsSortList[2]}">${itemsSortList[2]}</span>`
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

  const sortItems = document.querySelectorAll(".buttonCollapsed span");

  sortItems.forEach((sortItem) => {
    toggleClass(sortItem, "itemCollapsed");
  });

  const sortButtonItems = sortButton.querySelector("span");
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
