import React from "react";
import "../styles/SearchResults.css";
import PropTypes from "prop-types";

const SearchResults = ({ searchResults }) => {
  if (!searchResults) {
    return <p>No results</p>;
  } else {
    return (
      <>
        {searchResults.map((image) => (
          <img
            key={image}
            className="card-image"
            src={image}
            alt="spaceImage"
          />
        ))}
      </>
    );
  }
};

export default SearchResults;

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
};
