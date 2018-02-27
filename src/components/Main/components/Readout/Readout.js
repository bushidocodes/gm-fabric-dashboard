import React from "react";
import { PropTypes } from "prop-types";

import { COLOR_SUCCESS } from "style/styleVariables";
import ReadoutDisplay from "./components/ReadoutDisplay";
import ReadoutItem, { ReadoutItemShape } from "./components/ReadoutItem";

export default function Readout({
  cacheCard,
  children,
  primary,
  color,
  readoutItems = []
}) {
  return (
    <ReadoutDisplay
      primary={primary}
      color={color || COLOR_SUCCESS}
      cacheCard={cacheCard}
    >
      {readoutItems.map(item => (
        <ReadoutItem
          key={`${item.title}|${item.value}|${item.detail}`}
          {...item}
          cacheCard={cacheCard}
        />
      ))}
    </ReadoutDisplay>
  );
}

Readout.propTypes = {
  cacheCard: PropTypes.bool,
  children: PropTypes.element,
  color: PropTypes.string,
  primary: PropTypes.bool,
  readoutItems: PropTypes.oneOfType([
    PropTypes.arrayOf(ReadoutItemShape),
    PropTypes.object
  ])
};
