// Display Sort

let itemsList = ["Popularité", "Date", "Titre"];
const sortButton = document.querySelector(".sort-button");
displayItemsList();

let isSortOpen = false;

sortButton.addEventListener("click", toggleSortList);
sortButton.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    toggleSortList(evt);
  }
});

function displayItemsList() {
  sortButton.innerHTML = `<span tabindex="0" aria-selected="true" role="listbox" aria-label="Trier par ${itemsList[0]}" aria-labelledby="Trier par ${itemsList[0]}">${itemsList[0]}</span><span tabindex="0" role="listbox" aria-label="Trier par ${itemsList[1]}" aria-labelledby="Trier par ${itemsList[1]}">${itemsList[1]}</span><span tabindex="0" role="listbox" aria-label="Trier par ${itemsList[2]}" aria-labelledby="Trier par ${itemsList[2]}">${itemsList[2]}</span>`;
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
  const selectedItem = evt.target.textContent || itemsList[0];

  itemsList = itemsList.filter((item) => item !== selectedItem);
  itemsList.unshift(selectedItem);
  sortButton.setAttribute("aria-activedescendant", selectedItem);
  displayItemsList();
}

function openSort() {
  isSortOpen = true;
  sortButton.classList.remove("sort-button");
  sortButton.classList.add("buttonCollapsed");
  sortButton.setAttribute("aria-expanded", true);

  const sortItems = document.querySelectorAll(".buttonCollapsed span");
  sortItems.forEach((sortItem) => {
    sortItem.classList.toggle("itemCollapsed");
  });
  sortButton.querySelector("span").focus();
}

function closeSort() {
  const sortItemsCollapsed = document.querySelectorAll(".itemCollapsed");
  sortItemsCollapsed.forEach((sort) => {
    sort.classList.remove("itemCollapsed");
  });
  sortButton.classList.remove("buttonCollapsed");
  sortButton.classList.add("sort-button");
  sortButton.setAttribute("aria-expanded", false);
  isSortOpen = false;
}
