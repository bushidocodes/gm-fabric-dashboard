import React from "react";
import { mount } from "enzyme";
import NotificationSystem from "react-notification-system";

import Notification from "./index";

describe("Notification", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Notification />);
  });

  test("returns <NotificationSystem />", () => {
    expect(wrapper.find(NotificationSystem)).toHaveLength(1);
  });

  test("attaches an addNotification method to the window object", () => {
    expect(window.addNotification).toBeDefined();
  });
});
