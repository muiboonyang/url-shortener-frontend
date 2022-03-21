import React, { useState } from "react";
import { renderHook } from "@testing-library/react-hooks";
import App from "../App";
import { loginContext } from "../context/login-context";

const LoginContext = ({ children }) => (
  <loginContext.Provider>{children}</loginContext.Provider>
);

const wrapper = ({ children }) => <LoginContext>{children}</LoginContext>;

let resultState1 = "";
let resultState2 = false;
let resultState3 = 0;

const mockSetExpenses = jest.fn().mockImplementation((state) => {
  resultState1 = [...state];
  return resultState1;
});

const mockSetExpenses2 = jest.fn().mockImplementation((state) => {
  resultState2 = [...state];
  return resultState2;
});

const mockSetExpenses3 = jest.fn().mockImplementation((state) => {
  resultState3 = [...state];
  return resultState3;
});

const mockUseContext = jest.fn().mockImplementation(() => ({
  profileName: "",
  setProfileName: mockSetExpenses,
}));

const mockUseContext2 = jest.fn().mockImplementation(() => ({
  loggedIn: false,
  setLoggedIn: mockSetExpenses2,
}));

const mockUseContext3 = jest.fn().mockImplementation(() => ({
  updateThis: 0,
  setUpdateThis: mockSetExpenses3,
}));

React.useContext = mockUseContext;
React.useContext = mockUseContext2;
React.useContext = mockUseContext3;

describe("useState", () => {
  it("should add expense", () => {
    const { result } = renderHook(() => useState(), { wrapper });

    expect(resultState1).toHaveLength(0);

    result.current.addExpense({
      id: "1",
      item: "p",
      price: "2",
    });

    expect(mockSetExpenses).toHaveBeenCalled();
    expect(resultState1).toHaveLength(1);
  });
});
