import React, { Component } from "react";
import { PropTypes } from "prop-types";

import BorderSquare from "./components/BorderSquare";
import BorderCircleSmall from "./components/BorderCircleSmall";
import BorderSquareSmall from "./components/BorderSquareSmall";
import BorderTriangleSmall from "./components/BorderTriangleSmall";

// import all icon Border components
const borderStyles = {
  BorderSquare,
  BorderSquareSmall,
  BorderTriangleSmall,
  BorderCircleSmall
};

export default class IconBorder extends Component {
  static propTypes = {
    borderColor: PropTypes.string,
    borderOpacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string
  };

  components = {
    name: this.props.name
  };

  render() {
    const { name, borderColor, borderOpacity } = this.props;

    // dynamically render glyph component by name
    const IconBorderComponent = borderStyles[name];
    return (
      <IconBorderComponent
        name={name}
        borderColor={borderColor}
        borderOpacity={borderOpacity}
      />
    );
  }
}

IconBorder.defaultProps = {
  borderColor: "transparent",
  borderOpacity: 1,
  name: "BorderSquare"
};
