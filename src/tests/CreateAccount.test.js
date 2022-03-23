import React from "react";
import { mount } from "enzyme";
import CreateAccount from "../pages/CreateAccount";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

const setup = (props = {}) => {
  const wrapper = mount(<CreateAccount {...props} />);
  return wrapper;
};

describe("FormComponent", () => {
  it("renders without errors", () => {
    const wrapper = setup();
    const component = wrapper.find(CreateAccount);

    expect(component).toHaveLength(1);
  });

  it("calls the onSubmit method", () => {
    const handleSubmitMock = jest.fn();
    const wrapper = setup({ onSubmit: handleSubmitMock });

    const form = wrapper.find("form").at(0);
    form.simulate("submit", {});

    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });

  it("calls the onSubmit method with the expected value", () => {
    const handleSubmitMock = jest.fn();
    const wrapper = setup({ onSubmit: handleSubmitMock });

    const nameInput = wrapper.find("input[name='name']");
    nameInput.simulate("change", {
      target: { name: "name", value: "Ernest" },
    });

    const form = wrapper.find("form").at(0);
    form.simulate("submit", {});

    expect(handleSubmitMock).toHaveBeenCalledWith({
      name: "Ernest",
    });
  });
});
