import React, { useState, useEffect } from "react";
import { characterURL } from "./helper";
import CharCard from "./CharCard";

export default function Character(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedCharacter, setLoadedCharacter] = useState({});

  useEffect(() => {
    function fetchData() {
      setIsLoaded(false);
      let httpsCharacterURI = "https" + props.characterURI.substring(4);
      console.log(`Converted URI to:${httpsCharacterURI}`);
      fetch(characterURL(httpsCharacterURI))
        .then((res) => res.json())
        .then(
          (response) => {
            const loadedCharacter = {
              id: response.data.results[0].id,
              name: response.data.results[0].name,
              description: response.data.results[0].description,
              thumbnail: response.data.results[0].thumbnail,
              img:
                response.data.results[0].thumbnail.path +
                "." +
                response.data.results[0].thumbnail.extension,
              wikiLink: response.data.results[0].urls[1].url,
            };
            setLoadedCharacter(loadedCharacter);
            console.log(loadedCharacter);
            setIsLoaded(true);
          },
          (error) => {
            setError(error);
            console.log(error);
            setIsLoaded(true);
          }
        );
    }
    fetchData();
  }, [props.characterURI]);

  if (error) {
    return (
      <div className="loading-error mt-5 text-center display-1">
        There was cosmic interference, we could not find who you were looking
        for...
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div className="loading-text mt-5 text-center display-1">Loading...</div>
    );
  } else {
    return (
      <CharCard
        key={loadedCharacter.id}
        name={loadedCharacter.name}
        description={loadedCharacter.description}
        img={loadedCharacter.img}
        wikiLink={loadedCharacter.wikiLink}
      />
    );
  }
}
