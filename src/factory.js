const factory = new Factory();

function Factory() {
  this.createPhotographer = function (photographerData) {
    return new Photographer(photographerData);
  };

  this.createMedia = function (media) {
    return new Media(media);
  };

  class Photographer {
    constructor(data) {
      Object.assign(this, data);
    }

    getFormattedLocalization() {
      return `${this.city} , ${this.country}`;
    }

    getFormattedImg() {
      return `assets/pictures/photographers-photos/${this.name.replace(
        /-|[" "]/g,
        ""
      )}.jpg`;
    }

    getTotalLike() {
      return this.media.reduce((acc, picture) => {
        return acc + picture.likes;
      }, 0);
    }

    addLike(selectedMedia) {
      selectedMedia.likes = selectedMedia.likes + 1;
    }

    sortMediaByTitle() {
      return this.media.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }

    sortMediaByDate() {
      return this.media.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    sortMediaByLikes() {
      return this.media.sort((a, b) => b.likes - a.likes);
    }
  }

  class Media {
    constructor(data) {
      Object.assign(this, data);
    }

    getImgSrcFormatted() {
      return `assets/pictures/${this.photographerId}/${this.image}`;
    }

    getVideoSrcFormatted() {
      return `assets/pictures/${this.photographerId}/${this.video}`;
    }
  }
}
