import React from "react";
import "../styles/App.css";
import Search from "./Search";

function App() {
  return (
    <div className="App">
      <img
        className="nasa-logo"
        src="https://cdn.cnn.com/cnnnext/dam/assets/200424060716-nasa-worm-logo.jpg"
        alt="Nasa Company Logo"
      />
      <Search />
    </div>
  );
}

export default App;
