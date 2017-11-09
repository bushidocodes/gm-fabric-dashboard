import React from "react";

import StoryRouter from "storybook-router";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs";

import styled from "styled-components";

import { spacingScale } from "style/styleFunctions";

// same as current errorColor function.  may need to rewrite entirely to display range of color.  currently set as < 0.1% error rate is green, > 0.1% and < 1% is yellow, and >1% is red
function errorColor(errorPercent = 1) {
  const percent =
    typeof errorPercent === "number" ? errorPercent : parseFloat(errorPercent);
  if (percent < 0.1) return "darkgreen";
  else if (percent > 0.1 && percent < 1) return "#666600";
  else return "darkred";
}

// same as current TableCol component
const TableCol = styled.div`
  flex: 1 1 15%;
  min-height: ${spacingScale(4.5)};
  text-align: left;
  ${props =>
    props.errorPercent ? `color: ${errorColor(props.errorPercent)}` : ""};
`;

storiesOf("Error text color", module)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add("Error text color", () => (
    <div style={{ display: "flex" }}>
      <TableCol
        errorPercent={number("Number slider 0 to 1", 0.01, {
          range: true,
          min: 0,
          max: 1,
          step: 0.001
        })}
      >{`${number("Number slider 0 to 1", 0.01, {
        range: true,
        min: 0,
        max: 1,
        step: 0.001
      })}%`}</TableCol>
    </div>
  ));
