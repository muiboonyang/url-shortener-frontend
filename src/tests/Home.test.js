import { render } from "@testing-library/react";
import Home from "../pages/Home";

describe("async component", () => {
  test("renders items if request succeeds", async () => {
    // create a 'fetch'
    // hijack the 'fetch' (will not run fetch in code), return what is expected of me (a fake json)
    // will not call the API in your original file, will give it fake results

    // Post function - seed data
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{}],
    });

    render(<Home />);
  });
});