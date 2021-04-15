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

    getImgName() {
      return this.image
        ? this.image.split(".")[0].replaceAll("_", " ")
        : this.video.split(".")[0].replaceAll("_", " ");
    }
  }
}
