import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";

test("renders the login form", () => {
  render(<Login />);
  expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByText("Login")).toBeInTheDocument();
});
