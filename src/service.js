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
      const photographerPicture = picturesList.filter(
        (picture) => picture.photographerId === photographer.id
      );
      return { ...photographer, media: photographerPicture };
    });
  });
}
