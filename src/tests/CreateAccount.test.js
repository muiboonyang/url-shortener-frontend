//////////////////////////
// Sample test - 1 out of 3 passed
//////////////////////////

import React from "react";
import CreateAccount from "../pages/CreateAccount";
import { mount } from "enzyme";

const setup = () => {
  const wrapper = mount(<CreateAccount />);
  return wrapper;
};

describe("CreateAccount Component", () => {
  it("renders without errors", () => {
    const wrapper = setup();
    const component = wrapper.find(CreateAccount);

    expect(component).toHaveLength(1);
  });

  it("calls the onSubmit method", () => {
    const handleSubmitMock = jest.fn();
    const wrapper = setup({ onSubmit: handleSubmitMock });

    const form = wrapper.find("form");
    form.simulate("submit");

    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });

  it("calls the onSubmit method with the expected value", () => {
    const handleSubmitMock = jest.fn();
    const wrapper = setup({ onSubmit: handleSubmitMock });

    const nameInput = wrapper.find("input[name='name']");
    nameInput.simulate("change", {
      target: { name: "name", value: "Ernest" },
    });

    const form = wrapper.find("form");
    form.simulate("submit");

    expect(handleSubmitMock).toHaveBeenCalledWith({
      name: "Ernest",
    });
  });
});
