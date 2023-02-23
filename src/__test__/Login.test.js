import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Login from "../Login";

test("Login component is preset", async () => {
  render(<Login />);

  const userevnt = userEvent.setup();

  expect(screen.getByTestId("username")).toBeInTheDocument();
  expect(screen.getByTestId("password")).toBeInTheDocument();
  expect(screen.getByTestId("login-btn")).toBeInTheDocument();

  userevnt.type(screen.getByTestId("username"), "abc");
  userevnt.type(screen.getByTestId("password"), "");

  await waitFor(() => userevnt.click(screen.getByTestId("login-btn")));

  expect(screen.getByTestId("error-msg")).toBeInTheDocument();
  expect(screen.getByTestId("error-msg").textContent).toBe(
    "Please enter the user name and passord"
  );
});

test("Login component api call", async () => {
  render(<Login />);

  const fakeResponse = {
    id: 15,
    username: "kminchelle",
    email: "kminchelle@qq.com",
    firstName: "Jeanne",
    lastName: "Halvorson",
    gender: "female",
    image: "https://robohash.org/autquiaut.png?size=50x50&set=set1",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZz9zaXplPTUweDUwJnNldD1zZXQxIiwiaWF0IjoxNjM1NzczOTYyLCJleHAiOjE2MzU3Nzc1NjJ9.n9PQX8w8ocKo0dMCw3g8bKhjB8Wo7f7IONFBDqfxKhs"
  };

  jest.spyOn(window, "fetch").mockImplementationOnce(() => {
    return Promise.resolve({
      json: () => Promise.resolve(fakeResponse)
    });
  });

  await userEvent.type(screen.getByTestId("username"), "kminchelle");
  await userEvent.type(screen.getByTestId("password"), "0lelplR");
  await waitFor(() => userEvent.click(screen.getByTestId("login-btn")));
  await waitFor(() => screen.getByTestId("result"));

  expect(screen.getByTestId("result")).toBeInTheDocument();
  expect(screen.getByTestId("result").textContent).toBe(fakeResponse?.token);
});
