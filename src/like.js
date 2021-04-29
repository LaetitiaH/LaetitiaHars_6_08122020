// Init listener on click on picture like

function initLikesListenerClick() {
  const likes = document.querySelectorAll(".heart-button");
  likes.forEach((like) => {
    like.addEventListener("click", (evt) => {
      addLikeonMedia(evt);
    });
  });
}

// Add one like on click on picture like
function addLikeonMedia(evt) {
  const selectedMediaId = +evt.currentTarget.dataset.mediaId;
  const selectedMedialike = evt.currentTarget.previousElementSibling;

  const selectedMedia = photographer.media.find(
    (media) => media.id === selectedMediaId
  );
  photographer.addLike(selectedMedia);

  addTextContent(selectedMedialike, selectedMedia.likes);
  displayLikesNumber();
}
