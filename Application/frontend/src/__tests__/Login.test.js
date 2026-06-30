import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";

test("renders the login form", () => {
  render(<Login />);
  expect(screen.getByPlaceholderText(/e\.g\. r\.reddy/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
});
