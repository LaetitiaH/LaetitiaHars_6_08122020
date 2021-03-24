const sortSelectElement = document.querySelector("select");
const options = sortSelectElement.querySelectorAll("option");

sortSelectElement.addEventListener("click", displaySortList);
sortSelectElement.addEventListener("keydown", (key) => {
  if (key.key === "Enter") {
    displaySortList();
  }
});

function displaySortList() {
  if (sortSelectElement.attributes.size.value === "0") {
    options.forEach((option) => {
      option.style.display = "flex";
    });
    sortSelectElement.setAttribute("size", "3");
    sortSelectElement.style.height = "175px";
    sortSelectElement.style.padding = "0 10px 0 10px";
  } else {
    options.forEach((option) => {
      option.style.display = "none";
      sortSelectElement.style.height = "70px";
      sortSelectElement.style.padding = "0 0 0 20px";
    });
    sortSelectElement.setAttribute("size", "0");
  }
}
