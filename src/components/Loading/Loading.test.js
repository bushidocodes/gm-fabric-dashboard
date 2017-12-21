import React from "react";
import { shallow } from "enzyme";

import { Loading } from "./Loading";
import Spinner from "./components/Spinner";
import Message from "./components/Message";

describe("Loading", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Loading error={false} timedOut={false} pastDelay={true} />
    );
  });

  test("returns a <Spinner/> if pastDelay is true", () => {
    expect(wrapper.find(Spinner)).toHaveLength(1);
    // does not return error messages
    expect(wrapper.find(Message)).toHaveLength(0);
    expect(
      wrapper.html().includes("An error occurred while loading this component.")
    ).toBe(false);
    expect(
      wrapper
        .html()
        .includes(
          "This component failed to load within the allotted 15 seconds."
        )
    ).toBe(false);
  });

  test("returns an error message if error is true", () => {
    wrapper.setProps({ error: true });
    expect(wrapper.find(Message)).toHaveLength(1);
    expect(
      wrapper.html().includes("An error occurred while loading this component.")
    ).toBe(true);
    expect(wrapper.find(Spinner)).toHaveLength(0);
  });

  test("returns a message if timedOut is true", () => {
    wrapper.setProps({ error: false, timedOut: true });
    expect(wrapper.find(Message)).toHaveLength(1);
    expect(
      wrapper
        .html()
        .includes(
          "This component failed to load within the allotted 15 seconds."
        )
    ).toBe(true);
    expect(wrapper.find(Spinner)).toHaveLength(0);
  });
});
