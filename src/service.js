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

function getPhotographersListWithMedia() {
  return getPhotographersList().then((res) => {
    const photographersList = res.photographers;
    const picturesList = res.media;
    return photographersList.map((photographer) => {
      const photographerPicture = picturesList
        .filter((picture) => picture.photographerId === photographer.id)
        .map((media) => {
          return {
            ...media,
            type: media.image ? "img" : "mp4",
            name: media.image
              ? media.image.split(".")[0].replaceAll("_", " ")
              : media.video.split(".")[0].replaceAll("_", " "),
          };
        });
      return { ...photographer, media: photographerPicture };
    });
  });
}
