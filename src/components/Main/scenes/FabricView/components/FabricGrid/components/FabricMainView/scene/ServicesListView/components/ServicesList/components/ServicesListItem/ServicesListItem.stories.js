import React from "react";

import StoryRouter from "storybook-router";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs/react";

import GMServiceListItem from "./index.js";

const serviceStatus = ["Stable", "Warning", "Down"];

storiesOf("Service List Item", module)
  .addDecorator(StoryRouter())
  .addDecorator(withKnobs)
  .add("Service List Item", () => (
    <GMServiceListItem
      name={text("Service Name", "Service")}
      runtime={select("Runtime", ["JVM", "GO"], "JVM")}
      instances={[
        { name: "ee0fa3669fea7e9a0adea649c46bca56", start_time: 1508854912461 },
        { name: "8bedb4551e801f38bf149001a72a1127", start_time: 1508370483156 },
        { name: "d9de3a9c26c6c84daaf1ceb40559d659", start_time: 1508170483156 }
      ]}
      version={text("Version", "1.1")}
      status={select("Service State", serviceStatus, "Stable")}
      authorized={boolean("User is Authorized", true)}
      metered={boolean("Service is Metered", true)}
      docsLink={text("Docs Link", "#")}
    />
  ))
  .add("List of Service List Items", () => (
    <ul>
      <GMServiceListItem
        name="Awesome Service"
        instances={[
          {
            name: "ee0fa3669fea7e9a0adea649c46bca56",
            start_time: 1508854912461
          },
          {
            name: "8bedb4551e801f38bf149001a72a1127",
            start_time: 1508370483156
          },
          {
            name: "d9de3a9c26c6c84daaf1ceb40559d659",
            start_time: 1508170483156
          }
        ]}
        version="1.1"
        docsLink="http://www.deciphernow.com"
        runtime="JVM"
        metered={true}
        status="Stable"
      />
      <GMServiceListItem
        name="Awesome Service 2"
        instances={[
          {
            name: "ee0fa3669fea7e9a0adea649c46bca56",
            start_time: 1508854912461
          },
          {
            name: "8bedb4551e801f38bf149001a72a1127",
            start_time: 1508370483156
          },
          {
            name: "d9de3a9c26c6c84daaf1ceb40559d659",
            start_time: 1508170483156
          }
        ]}
        version="1.0"
        docsLink="http://www.deciphernow.com"
        runtime="JVM"
        metered={true}
        status="Down"
      />
      <GMServiceListItem
        name="Awesome Service 3"
        instances={[
          {
            name: "ee0fa3669fea7e9a0adea649c46bca56",
            start_time: 1508854912461
          },
          {
            name: "8bedb4551e801f38bf149001a72a1127",
            start_time: 1508370483156
          },
          {
            name: "d9de3a9c26c6c84daaf1ceb40559d659",
            start_time: 1508170483156
          }
        ]}
        version="1.1"
        docsLink="http://www.deciphernow.com"
        runtime="GO"
        metered={true}
        status="Warning"
      />
      <GMServiceListItem
        name="Awesome Service 4"
        instances={[
          {
            name: "ee0fa3669fea7e9a0adea649c46bca56",
            start_time: 1508854912461
          },
          {
            name: "8bedb4551e801f38bf149001a72a1127",
            start_time: 1508370483156
          },
          {
            name: "d9de3a9c26c6c84daaf1ceb40559d659",
            start_time: 1508170483156
          }
        ]}
        version="3.1"
        docsLink="http://www.deciphernow.com"
        status="Stable"
        metered={true}
        runtime="GO"
      />
    </ul>
  ));
