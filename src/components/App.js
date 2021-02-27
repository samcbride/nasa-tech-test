import React, { useState } from "react";
import "../styles/App.css";
import Search from "./Search";
import SearchResults from "./SearchResults";
import getImages from "../requests/getImages";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const getSearchResults = async (searchTerm) => {
    const images = await getImages(searchTerm);
    setSearchResults(images);
  };
  return (
    <div className="App">
      <img
        className="nasa-logo"
        src="https://cdn.cnn.com/cnnnext/dam/assets/200424060716-nasa-worm-logo.jpg"
        alt="Nasa Company Logo"
      />
      <Search handleSubmit={getSearchResults} />
      <SearchResults searchResults={searchResults} />
    </div>
  );
}

export default App;
