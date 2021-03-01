import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Search from "../components/Search";

describe("Search", () => {
  const stub = () => {};
  const mock = jest.fn();
  const { asFragment } = render(<Search handleSubmit={stub} />);

  it("renders correctly", () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it("check button exists with correct text", () => {
    const { getByRole } = render(<Search handleSubmit={mock} />); // Originally had `stub` in place of `mock` - is stub variable needed or can I just use mock? Aren't they essentially the same thing?
    const button = getByRole("button", { name: /Go/i });
    expect(button).toBeInTheDocument();
  });

  it("onSubmit is called with correct value", () => {
    const { getByRole } = render(<Search handleSubmit={mock} />);
    const input = getByRole("textbox");
    const button = getByRole("button", { name: /Go/i });
    fireEvent.change(input, { target: { value: "Nebula" } });
    fireEvent.click(button);

    expect(mock).toHaveBeenCalledWith("Nebula");
  });
});
