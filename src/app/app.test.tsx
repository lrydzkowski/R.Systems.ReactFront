import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./app";

test("renders R.Systems", () => {
  render(<App />, { wrapper: BrowserRouter });
  const linkElement = screen.getByText(/R.Systems/i);
  expect(linkElement).toBeInTheDocument();
});
