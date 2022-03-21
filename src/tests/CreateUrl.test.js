import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateUrl from "../pages/CreateUrl";

//============================================================
// Test Group - "plain old HTML" / 'Unit testing'
// Render parent
// COMPULSORY ("plain old HTML", "renders 'Parent Component'")
//============================================================

// DevOps (Continuous Integration)
// 1) First tests all your tests
// 2) Test components
// 3) Test database and user interfaces (e.g. buttons)

//=====================
// Checks for texts
//=====================

describe("plain old HTML", () => {
  test("renders CreateUrl Component'", () => {
    render(<CreateUrl />);

    // Find exact wording "Parent Component", exact = false (doesnt look for exact case)
    const textElement = screen.getByText("Url Shortener", { exact: false });
    expect(textElement).toBeInTheDocument();
  });

  test("renders 'Original text'", () => {
    render(<CreateUrl />);

    const textElement = screen.getByText("Enter URL here", { exact: false });
    expect(textElement).toBeInTheDocument();
  });

  //=====================
  // Checks what the button is meant to be testing
  // getBy - returns an error if cant find something
  // queryBy - returns null if cant find something
  // findBy - for promises (returns fulfilled / rejected promises) // deals with fetching data
  //=====================

  test("renders 'After button click' when button is clicked", () => {
    render(<CreateUrl />);

    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // const original = screen.getByText("after button click", { exact: false });
    // expect(original).toBeInTheDocument;

    // const afterClick = screen.queryByText("original text", { exact: false });
    // expect(afterClick).not.toBeInTheDocument;
  });
});
