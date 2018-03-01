import React from "react";
import StoryRouter from "storybook-router";

import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, select } from "@storybook/addon-knobs/react";

import NavTabGroup from "components/NavTab/components/NavTabGroup";
import NavTab from "components/NavTab";

storiesOf("NavTab", module)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add("NavTabGroup", () => (
    <NavTabGroup
      align={select("Align Tabs", ["center", "start", "end"], "center")}
      stretch={boolean("Stretch Tabs", false)}
    >
      <NavTab disabled label="Disabled tab" clickAction={false} />
      <NavTab active label="Active Tab" clickAction={false} />
      <NavTab label="Tab With Icon" glyph="Bell" clickAction={false} />
    </NavTabGroup>
  ));
