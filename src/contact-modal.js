const contactsButton = document.querySelectorAll(".contact-button");
const contactModal = document.querySelector(".contact-modal");
const contactModaltitle = document.querySelector("#contact-modal-titre");
const closeContactButton = document.querySelector(".modal-close-button--white");
const modalBackground = document.querySelector(".modal-background");
const submitButton = document.querySelector(".submit-button");

contactsButton.forEach((contactButton) => {
  contactButton.addEventListener("click", (evt) => {
    onOpenContactModal();
  });
});

// Change focus on closebutton on last clickable element
submitButton.addEventListener("keydown", (evt) => {
  if (
    evt.key === "Tab" &&
    contactModal.getAttribute("aria-hidden") === "false"
  ) {
    evt.preventDefault();
    closeContactButton.focus();
  }
});

// Init listener on click on close button
closeContactButton.addEventListener("click", onCloseContactModal);

// Display Contact modal with title and pictures
function onOpenContactModal() {
  modalBackground.style.display = "block";
  displayContactAccessibilityAttributes();
  displayContactTitle();
}

// Close modal
function onCloseContactModal() {
  modalBackground.style.display = "none";
  removeContactAccessibilityAttributes();
}

function displayContactAccessibilityAttributes() {
  addAttribute(mainContent, "aria-hidden", "true");
  addAttribute(contactModal, "aria-hidden", "false");
  addAttribute(contactModal, "aria-modal", "true");
  displayAccessibilityTitleAttributes(photographer);
  addClass(body, "no-scroll");
  closeContactButton.focus();
}

function removeContactAccessibilityAttributes() {
  addAttribute(mainContent, "aria-hidden", "false");
  addAttribute(contactModal, "aria-hidden", "true");
  addAttribute(contactModal, "aria-modal", "false");
  removeClass(body, "no-scroll");
  contactsButton.forEach((contactButton) => {
    contactButton.focus();
  });
}

function sendForm() {
  const form = document.forms["contact"];

  const formContactValue = {
    prenom: form[0].value,
    nom: form[1].value,
    email: form[2].value,
    message: form[3].value,
  };

  console.log(formContactValue);
  form.reset();

  onCloseContactModal();
}

// Display accessibility Title on modal
function displayAccessibilityTitleAttributes(photographer) {
  addAttribute(
    contactModal,
    "aria-labelledby",
    `Contactez moi ${photographer.name}`
  );
  addAttribute(contactModaltitle, "id", `Contactez moi ${photographer.name}`);
}

function displayContactTitle() {
  addTextContent(contactModaltitle, photographer.name);
}
