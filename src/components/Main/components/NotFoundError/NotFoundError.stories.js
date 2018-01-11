import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs/react";

import NotFoundError from "./NotFoundError";

storiesOf("NotFoundError", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <div style={{ display: "flex" }}>
      <NotFoundError errorMsg={text("errorMsg")} />
    </div>
  ));
