// TODO: add js;

const container  = document.querySelector('#video-box')
const vastUrl = 'https://cdn.admixer.net/public/player%2Fregular-preroll.xml';

let a:object = {};

async function fetching (url: string) {
  let resultObj: any;
  resultObj = await fetch(url)
  .then(response => response.text())
  .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
  .then(result => result.all).then(result => Object.values(result))
  .then(result => result.filter(element => (element.attributes.type)))
  .then(result=> result.filter(el => el.attributes.type.textContent=== 'video/mp4'))
  .then(result => result[0].innerHTML).then(result => result.trim().slice(9, -3));
  // .then(result => container.insertAdjacentHTML('afterbegin',`<video src="${result}"></video>`))
  return resultObj;
}



 let toFetch =  fetching(vastUrl)

console.log(toFetch)


class Player {
  url: string;
  prepearedXML: any;
  video: any;

 
  setVastUrl(vastUrl: string) {
    this.url = vastUrl;
  }

  load(vastUrl: string) {
    this.prepearedXML = fetch(vastUrl)
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(result => result.all).then(result => Object.values(result))
    .then(result => result.filter((element: { attributes: { type: any; }; }) => (element.attributes.type)))
    .then(result=> result.filter(el => el.attributes.type.textContent=== 'video/mp4'))
    .then(result => result[0].innerHTML).then(result => result.trim().slice(9, -3))
    
  }

  start() {
    this.prepearedXML.then((result: string) => {
      this.video = document.createElement('video')
      this.video.setAttribute('src', result);
      this.video.classList.add('video')
      container?.append(this.video)
    })
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
