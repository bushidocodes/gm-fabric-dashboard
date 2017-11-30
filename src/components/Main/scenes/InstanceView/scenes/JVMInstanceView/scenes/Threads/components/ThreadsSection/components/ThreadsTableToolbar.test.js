import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";

import ThreadsTableToolbar from "./ThreadsTableToolbar";
import ButtonGroup from "components/ButtonGroup";
import Button from "components/Button";
import Toolbar from "components/Main/components/TableToolbar/components/Toolbar";
import ToolbarCenter from "components/Main/components/TableToolbar/components/ToolbarCenter";

// import Actions
import "services";

let wrapper;
let mockProps = {
  threadCounts: { active: 17, idle: 8, stopped: 25, all: 40 },
  threadsFilter: "active"
};
const ThreadsTableToolbarWithProps = <ThreadsTableToolbar {...mockProps} />;

describe("ThreadsTableToolbar component", () => {
  beforeEach(function() {
    wrapper = mount(ThreadsTableToolbarWithProps);
  });

  test("Matches the snapshot", () => {
    const ThreadsTableToolbarComponent = renderer
      .create(<ThreadsTableToolbar {...mockProps} />)
      .toJSON();
    expect(ThreadsTableToolbarComponent).toMatchSnapshot();
  });

  test("Renders correct components", () => {
    expect(wrapper.find(Toolbar).length).toBe(1);
    expect(wrapper.find(ToolbarCenter).length).toBe(1);
    expect(wrapper.find(ButtonGroup).length).toBe(1);
    expect(wrapper.find(Button).length).toBe(4);
  });
  test("Buttons displays correct number of threadCounts per status", () => {
    const buttons = wrapper.find(Button);
    expect(buttons.at(0).props().suffix).toBe(40);
    expect(buttons.at(1).props().suffix).toBe(17);
    expect(buttons.at(2).props().suffix).toBe(8);
    expect(buttons.at(3).props().suffix).toBe(25);
  });
});
