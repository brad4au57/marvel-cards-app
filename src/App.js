import React, { useState } from "react";
import "./App.css";
import "./styles/App.scss";
import Character from "./components/Character";
import CharPicker from "./components/CharPicker";

function App() {
  const [charSelection, setCharSelection] = useState(
    "https://gateway.marvel.com/v1/public/characters/1017574"
  );

  const charSelectionHandler = (e) => {
    setCharSelection(e);
    console.log("URI from App: " + e);
    console.log("Event passed to App...");
  };

  return (
    <div className="App">
      <CharPicker
        characterURI={charSelection}
        onCharSelect={charSelectionHandler}
      />
      <Character characterURI={charSelection} />
    </div>
  );
}

export default App;
