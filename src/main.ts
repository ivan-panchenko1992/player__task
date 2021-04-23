const container = document.querySelector('#video-box');
const vastUrl = 'https://cdn.admixer.net/public/player%2Fregular-preroll.xml';

const loadButton = document.querySelector('#load');
const startButton = document.querySelector('#start');
const playButton = document.querySelector('#play');
const pauseButton = document.querySelector('#pause');
const closeButton = document.querySelector('#close');

class Player {
  url: string = '';

  prepearedUrl: any;

  video: any;

  setVastUrl(url: string) {
    this.url = url;
  }

  load() {
    fetch(this.url)
      .then((response) => response.text())
      .then((xmlText) => (new window.DOMParser())
        .parseFromString(xmlText, 'text/xml'))
      .then((xmlInJson) => xmlInJson.all)
      .then((allCollection) => Object.values(allCollection))
      .then((allCollectionInArray) => allCollectionInArray
        .filter((element: { attributes: { type: any; }; }) => (element.attributes.type)))
      .then((filterCollectionByEmptyType) => filterCollectionByEmptyType
        .find((element: any) => element.attributes?.type?.textContent === 'video/mp4'))
      .then((requiredElement) => requiredElement?.innerHTML)
      .then((resultUrl: string | undefined) => {
        if (!resultUrl) {
          return new Error('ERROOORRR');
        }
        resultUrl.trim();
        const startOfUrl = resultUrl.indexOf('https');
        const endOfUrl = resultUrl.indexOf('mp4') + 3;
        return resultUrl.slice(startOfUrl, endOfUrl);
      })
      .then((url) => {
        this.prepearedUrl = url;
      });
  }

  start() {
    this.video = document.createElement('video');
    this.video.setAttribute('src', this.prepearedUrl);
    this.video.classList.add('video-container__video');
    this.video.setAttribute('disabled', 'true');
    container?.append(this.video);
  }

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }

  close() {
    this.video.remove();
  }
}

const player = new Player();

loadButton?.addEventListener('click', () => {
  player.setVastUrl(vastUrl);
  player.load();
});
startButton?.addEventListener('click', () => {
  player.start();
  startButton.setAttribute('disabled', 'true');
});
playButton?.addEventListener('click', () => (player.play()));
pauseButton?.addEventListener('click', () => (player.pause()));
closeButton?.addEventListener('click', () => {
  player.close();
  startButton?.removeAttribute('disabled');
});
