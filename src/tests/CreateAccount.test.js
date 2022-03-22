import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import { render, screen } from "@testing-library/react";
import CreateAccount from "../pages/CreateAccount";

// ===================
// Mocking
// can be used on API, databases
// create a 'fetch'
// ===================

describe("async component", () => {
  test("renders items if request succeeds", async () => {
    // create a 'fetch'
    // hijack the 'fetch' (will not run fetch in code), return what is expected of me (a fake json)
    // will not call the API in your original file, will give it fake results
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          username: "username",
          password: "password",
          name: "name",
        },
      ],
    });

    render(<CreateAccount />);

    // const listElement = await screen.findAllByRole("listitem");
    // expect(listElement).not.toHaveLength(0);
  });
});

describe("Test buttons", () => {
  test("button click", () => {
    render(<CreateAccount />);
    // const mockCallBack = jest.fn();

    // const buttonElement = screen.getByRole("button");
    // buttonElement.simulate("click");
    // expect(mockCallBack.mock.calls.length).toEqual(1);

    const buttonElement = screen.getAllByRole("button")[0];
    userEvent.click(buttonElement);

    const buttonElement2 = screen.getAllByRole("button")[1];
    userEvent.click(buttonElement2);
  });
});

// test("Test button click", () => {
//   render(<CreateAccount />);

//   const buttonElement = screen.getByRole("button");
//   userEvent.click(buttonElement);

// const original = screen.getByText("after button click", { exact: false });
// expect(original).toBeInTheDocument;

// const afterClick = screen.queryByText("original text", { exact: false });
// expect(afterClick).not.toBeInTheDocument;
