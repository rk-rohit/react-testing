import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("test app component", async () => {
  render(<App />);
  const user = userEvent.setup();

  expect(screen.getByText("Hello CodeSandbox")).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();

  expect(screen.getByTestId("click-btn")).toBeInTheDocument();
  expect(screen.getByTestId("click-btn")).toHaveTextContent("Click");
  expect(screen.queryByTestId("title-info")).toHaveTextContent("");
  await waitFor(() => user.click(screen.getByTestId("click-btn")));
  expect(screen.queryByTestId("title-info")).toBeInTheDocument();
  expect(screen.queryByTestId("title-info")).toHaveTextContent("hello");
});
