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
  .then(result => result[0].innerHTML)
  .then(result => container.insertAdjacentHTML('afterbegin',`<video src="${result}"></video>`))
  return resultObj;
}


// async function http<T>(
//   request: RequestInfo
// ): Promise<T> {
//   const response = await fetch(request);
//   const body = await response.text();
//   return body;
// }
 let b:any;
 let toFetch =   fetching(vastUrl)
//  fetch(vastUrl).then(response => response.text()).then(result => {
//    console.log(typeof result) 
//    a = result});

console.log(toFetch)


class Player {
  url: string;
  prepearedXML: any;
 
  setVastUrl(vastUrl: string) {
    this.url = vastUrl;
  }

  load(vastUrl: string) {
    this.prepearedXML = fetch(vastUrl)
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(result => result.all).then(result => Object.values(result))
    .then(result => result.filter(element => (element.attributes.type)))
    .then(result=> result.filter(el => el.attributes.type.textContent=== 'video/mp4'))
  }

  async start() {
    let resultString: any;
    await this.prepearedXML.then((result: { innerHTML: any; }[]) => resultString =  result[0].innerHTML)
    container.insertAdjacentHTML('afterbegin',`<video src="${resultString} width="400" height="300"></video>`)
  }

  play() {

  }

  pause() {

  }

  close() {

  }
}
