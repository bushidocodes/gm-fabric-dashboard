import React from "react";
import PropTypes from "prop-types";

import SecondaryText from "components/SecondaryText";

export default function GMSelectValueRenderer({ title, val }) {
  return (
    <span>
      <span>{title} </span>
      <SecondaryText>{val.label}</SecondaryText>
    </span>
  );
}

GMSelectValueRenderer.propTypes = {
  title: PropTypes.string.isRequired,
  val: PropTypes.object.isRequired
};
