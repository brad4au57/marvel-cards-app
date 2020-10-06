import md5 from "md5";

export function characterURL(charURI) {
  let pubKey = process.env.REACT_APP_MARVEL_PUBLIC;
  let privKey = process.env.REACT_APP_MARVEL_PRIVATE;
  let ts = +new Date();
  let hash = md5(ts + privKey + pubKey);
  const requestURL =
    charURI + "?ts=" + ts + "&apikey=" + pubKey + "&hash=" + hash;
  return requestURL;
}

export function seriesURL(series_id) {
  let pubKey = process.env.REACT_APP_MARVEL_PUBLIC;
  let privKey = process.env.REACT_APP_MARVEL_PRIVATE;
  let ts = +new Date();
  let hash = md5(ts + privKey + pubKey);
  let baseURL = "https://gateway.marvel.com/v1/public/series/";
  const requestURL =
    baseURL + series_id + "?ts=" + ts + "&apikey=" + pubKey + "&hash=" + hash;
  return requestURL;
}
