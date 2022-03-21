import { render } from "@testing-library/react";
// import { render, screen } from "@testing-library/react";
import Display from "../pages/Display";

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
      json: async () => [{ id: "880", name: "Whatever" }],
    });

    render(<Display />);

    // const listElement = await screen.findAllByRole("listitem");
    // expect(listElement).not.toHaveLength(0);
  });
});
