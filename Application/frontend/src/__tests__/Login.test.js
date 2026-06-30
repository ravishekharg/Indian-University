import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";

test("renders the login form", () => {
  render(<Login />);
<<<<<<< HEAD
  expect(screen.getByPlaceholderText(/e\.g\. r\.reddy/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
=======
  expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByText("Login")).toBeInTheDocument();
>>>>>>> 4606112d88dc7ce4bf04f6d4ac590f7c5cbf4f00
});
