import React from "react";
import App from "./App";
import { render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fetchShow } from "./api/fetchShow";
import { data } from "./mockData";

jest.mock("./api/fetchShow.js");

fetchShow.mockResolvedValue({ data });

describe("App component", () => {
  test("Correctly makes API request and displays the show data", async () => {
    // Arrange
    const { getByText, getAllByText } = render(<App />);
    // Act, Assert
    // check that we display the loading text
    expect(getByText(/Fetching data.../)).toBeInTheDocument();
    // check that we display the show title once the data loads
    await waitFor(() =>
      expect(getAllByText(/Stranger Things/i).length).toBe(2)
    );
  });

  test("Correctly switches between seasons and displays appropriate episodes", async () => {
    //Arrange
    const { getByText, getAllByText } = render(<App />);
    await waitFor(() =>
      expect(getAllByText(/Stranger Things/i).length).toBe(2)
    );
    // select season 1 and check that appropriate episodes show up
    userEvent.click(getByText(/select a season/i));
    expect(getByText(/season 1/i)).toBeInTheDocument();
    userEvent.click(getByText(/season 1/i));
    expect(
      getByText("Chapter One: The Vanishing of Will Byers")
    ).toBeInTheDocument();
  });
});
