import React from "react";
import { PropTypes } from "prop-types";

import ReadoutContainer from "./components/ReadoutContainer";
import ReadoutItem from "./components/ReadoutItem";

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
          icon={item.icon}
          iconName={item.iconName}
          iconBorderStyle={item.iconBorderStyle}
          iconShape={item.iconShape}
          iconColor={item.iconColor}
          title={item.title}
          value={item.value}
          detail={item.detail}
          graphData={item.graphData}
          children={item.children}
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
  readoutItems: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  readoutItemsContainerStyle: PropTypes.object,
  readoutItemsStyle: PropTypes.object
};
