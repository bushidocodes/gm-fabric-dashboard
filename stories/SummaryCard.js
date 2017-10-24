import React from "react";
import { storiesOf } from "@storybook/react";

import SidebarCard from "../src/components/Sidebar/components/SidebarCard";
import StoryRouter from "storybook-router";

storiesOf("Summary Card", module)
  .addDecorator(StoryRouter())
  .add("Down", () => <SidebarCard status="down" href="/" />)
  .add("Stable", () => <SidebarCard status="stable" href="/" />)
  .add("Warning", () => <SidebarCard status="warning" href="/" />);
