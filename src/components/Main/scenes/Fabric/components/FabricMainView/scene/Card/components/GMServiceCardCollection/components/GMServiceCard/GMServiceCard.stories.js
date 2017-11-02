import React from "react";

import StoryRouter from "storybook-router";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

import GMServiceCard from "./index.js";

const serviceStatus = ["Stable", "Warning", "Down"];

storiesOf("Service Card", module)
  .addDecorator(StoryRouter())
  .addDecorator(withKnobs)
  .add("Service Card", () => (
    <GMServiceCard
      name={text("Name", "Service Name")}
      version={text("Version", "1.0")}
      status={select("Service State", serviceStatus, "Stable")}
      authorized={boolean("User is Authorized", true)}
      docsLink={text("Docs Link", "#")}
    />
  ))
  .add("Services Grid", () => (
    <div style={{ display: "flex", flexDirection: "row", height: "150px" }}>
      <GMServiceCard
        name="Service 1"
        version="3.1"
        docsLink="http://www.deciphernow.com"
        status="Stable"
      />
      <GMServiceCard
        name="Service 2"
        version="1.1"
        docsLink="http://www.deciphernow.com"
        status="Stable"
      />
      <GMServiceCard
        name="Service 3"
        version="1.0"
        docsLink="http://www.deciphernow.com"
        status="Down"
      />
      <GMServiceCard
        name="Service 4"
        version="1.1"
        docsLink="http://www.deciphernow.com"
        status="Warning"
      />
      <GMServiceCard
        name="Service 1"
        version="3.1"
        docsLink="http://www.deciphernow.com"
        status="Stable"
      />
      <GMServiceCard
        name="Service 2"
        version="1.1"
        docsLink="http://www.deciphernow.com"
        status="Stable"
      />
      <GMServiceCard
        name="Service 3"
        version="1.0"
        docsLink="http://www.deciphernow.com"
        status="Down"
      />
      <GMServiceCard
        name="Service 4"
        version="1.1"
        docsLink="http://www.deciphernow.com"
        status="Warning"
      />
    </div>
  ));
