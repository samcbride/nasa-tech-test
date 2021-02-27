import React, { useState } from "react";
import "../styles/Search.css";
import PropTypes from "prop-types";

const Search = ({ handleSubmit }) => {
  const [value, setValue] = useState();

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(value);
  };

  return (
    <div className="Search">
      <form className="search-form" onSubmit={onSubmit}>
        <input
          className="search-area"
          type="text"
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="search-button" type="submit">
          Go!
        </button>
      </form>
    </div>
  );
};

export default Search;

Search.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
