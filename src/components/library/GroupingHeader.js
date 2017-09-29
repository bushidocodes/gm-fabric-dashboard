import React from "react";
import { PropTypes } from "prop-types";
import IndicatorIcon from "./IndicatorIcon";

import styled from "styled-components";

const Heading = styled.div`
  font-size: 1.5em;
  text-align: left;
  color: gray;
  vertical-align: text-bottom;
  padding: 0 0 0 5px;
  height: 40px;
`;

const HeaderTitle = styled.span`padding: 0 0 0 10px;`;

GroupingHeader.propTypes = {
  headerTitle: PropTypes.string.isRequired
};

/**
 * Grouping header with icon and headerTitle
 */
export default function GroupingHeader({ headerTitle }) {
  // Icon based on the headerTitle
  let indicatorIconColor;
  switch (headerTitle) {
    case "Down":
      indicatorIconColor = "red";
      break;
    case "Warning":
      indicatorIconColor = "#ffcc00";
      break;
    case "Stable":
      indicatorIconColor = "green";
      break;
    default:
      indicatorIconColor = "black";
  }
  return (
    <Heading>
      <IndicatorIcon color={indicatorIconColor} diameter={20} />
      <HeaderTitle>{headerTitle}</HeaderTitle>
    </Heading>
  );
}
