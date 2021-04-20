// TODO: add js;

const container  = document.querySelector('#video-box')
const vastUrl = 'https://cdn.admixer.net/public/player%2Fregular-preroll.xml';

function fetching(url: string) {
  const result = fetch(url).then(respose => respose.text()).then(result => result);
  return result;
}
 
const toFetch = fetching(vastUrl);

console.log(toFetch)


class Player {
  url: string;

  
  setVastUrl(vastUrl: string) {
    this.url = vastUrl;

}


