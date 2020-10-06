import React, { useState, useEffect } from "react";
import { seriesURL } from "./helper";
// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function getWindowWidth() {
  const { innerWidth: width } = window;
  return width;
}

export default function CharPicker(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedSeries, setLoadedSeries] = useState({});
  const [activeTitle, setActiveTitle] = useState("");
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  const fetchData = () => {
    console.log(windowWidth);
    const series_id = 16410; //Guardians of the Galaxy (2013-2015)

    fetch(seriesURL(series_id))
      .then((res) => res.json())
      .then(
        (response) => {
          const loadedSeries = {
            id: response.data.results[0].id,
            characters: response.data.results[0].characters.items,
          };
          setLoadedSeries(loadedSeries);
          setActiveTitle(loadedSeries.characters[0].name);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          console.log(error); // Output error for debugging
          setIsLoaded(true);
        }
      );
  };

  useEffect(() => {
    fetchData();
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (error) {
    return (
      <div className="loading-error text-center display-1 mt-5">
        There was cosmic interference, we could not find who you were looking
        for...
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div className="loading-text text-center display-1 mt-5">Loading...</div>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col className="text-center mt-md-5">
            <DropdownButton
              variant="char-custom"
              className="mt-3 character-picker-button"
              id="dropdown-basic-button"
              title={
                windowWidth < 576
                  ? activeTitle
                  : "Select a character: " + activeTitle
              }
              size="lg"
            >
              {loadedSeries.characters
                .filter((filterChar) => filterChar.name !== "Young X-Men")
                .map((char) => (
                  <Dropdown.Item
                    eventKey={char.resourceURI}
                    key={char.name}
                    onSelect={(e) => {
                      props.onCharSelect(e);
                      setActiveTitle(char.name);
                    }}
                  >
                    {char.name}
                  </Dropdown.Item>
                ))}
            </DropdownButton>
          </Col>
        </Row>
      </Container>
    );
  }
}
