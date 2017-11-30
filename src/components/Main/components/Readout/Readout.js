import React from "react";
import { PropTypes } from "prop-types";

import ReadoutContainer from "./components/ReadoutContainer";
import ReadoutItem, { ReadoutItemShape } from "./components/ReadoutItem";

export default function Readout({
  primary,
  readoutItems = [],
  children,
  readoutContainerStyle,
  readoutItemsStyle,
  readoutItemsContainerStyle
}) {
  return (
    <ReadoutContainer primary={primary} style={readoutContainerStyle}>
      {readoutItems.map(item => (
        <ReadoutItem
          key={`${item.title}|${item.value}|${item.detail}`}
          {...item}
          readoutItemsStyle={readoutItemsStyle}
          readoutItemsContainerStyle={readoutItemsContainerStyle}
        />
      ))}
    </ReadoutContainer>
  );
}

Readout.propTypes = {
  children: PropTypes.element,
  primary: PropTypes.bool,
  readoutContainerStyle: PropTypes.object,
  readoutItems: PropTypes.oneOfType([
    PropTypes.arrayOf(ReadoutItemShape),
    PropTypes.object
  ]),
  readoutItemsContainerStyle: PropTypes.object,
  readoutItemsStyle: PropTypes.object
};
