import React from "react";
import { render } from "@testing-library/react";
import SearchResults from "../components/SearchResults";

describe("SearchResults", () => {
  const stub = ["image1.jpeg", "image2.jpeg", "image3.jpeg"];
  const { asFragment } = render(<SearchResults searchResults={stub} />);

  it("renders correctly", () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders alt text correctly", () => {
    const { getAllByAltText } = render(<SearchResults searchResults={stub} />);
    expect(getAllByAltText("spaceImage")[0]).toHaveClass("card-image");
  });
});

// Create a test here that checks if it's not called or it doesn't render
