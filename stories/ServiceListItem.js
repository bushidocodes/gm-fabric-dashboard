import React from "react";

import StoryRouter from "storybook-router";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";

import GMServiceListItem from "../src/components/Main/scenes/Fabric/components/FabricMainView/scene/Table/components/GMServiceList/components/GMServiceListItem";

const serviceStatus = ["Stable", "Warning", "Down"];

storiesOf("Service List Item", module)
  .addDecorator(StoryRouter())
  .addDecorator(withKnobs)
  .add("Service List Item", () => (
    <GMServiceListItem
      name={text("Service Name", "Service")}
      instances={["a8a76dfaasdf", "234igkefaskjf", "asdfhaksjhf8"]}
      version={text("Version", "1.1")}
      status={select("Service State", serviceStatus, "Stable")}
      authorized={boolean("User is Authorized", true)}
      docsLink={text("Docs Link", "#")}
    />
  ))
  .add("List of Service List Items", () => (
    <ul>
      <GMServiceListItem
        name="Awesome Service"
        instances={["a8a76dfaasdf", "234igkefaskjf", "asdfhaksjhf8"]}
        version="1.1"
        docsLink="http://www.deciphernow.com"
        status="Stable"
      />
      <GMServiceListItem
        name="Awesome Service 2"
        instances={["a8a76dfaasdf", "234igkefaskjf", "asdfhaksjhf8"]}
        version="1.0"
        docsLink="http://www.deciphernow.com"
        status="Down"
      />
      <GMServiceListItem
        name="Awesome Service 3"
        instances={["a8a76dfaasdf", "234igkefaskjf", "asdfhaksjhf8"]}
        version="1.1"
        docsLink="http://www.deciphernow.com"
        status="Warning"
      />
      <GMServiceListItem
        name="Awesome Service 4"
        instances={["a8a76dfaasdf", "234igkefaskjf", "asdfhaksjhf8"]}
        version="3.1"
        docsLink="http://www.deciphernow.com"
        status="Stable"
      />
    </ul>
  ));
