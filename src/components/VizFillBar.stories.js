import React from "react";

import StoryRouter from "storybook-router";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs";

import styled from "styled-components";

import TableColVizBar from "components/Main/components/TableColVizBar";
import VizBar from "components/Main/components/VizBar";

import { contrastColor } from "style/styleFunctions";

// I copied over VizFill styled component here.  VizFill uses contrastColor function imported from styleFunctions.
const VizFill = styled.div`
  width: ${props => (props.width ? `${props.width}%` : "0%")};
  position: absolute;
  background-color: ${props =>
    props.width
      ? `${contrastColor("red", props.width / 100, "blue")}`
      : "currentColor"};
  border-radius: 0 1px 0 0;
  height: 2px;
  left: 0;
  bottom: 0;
`;

storiesOf("Vizfill bar", module)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add("Vizfill bar", () => (
    <div style={{ display: "flex" }}>
      <TableColVizBar>
        <VizBar>
          <VizFill
            width={number("Number slider 0 to 100", 50, {
              range: true,
              min: 0,
              max: 100,
              step: 5
            })}
          />
        </VizBar>{" "}
        {number("Number slider 0 to 100", 50, {
          range: true,
          min: 0,
          max: 100,
          step: 5
        })}%
      </TableColVizBar>
    </div>
  ));
