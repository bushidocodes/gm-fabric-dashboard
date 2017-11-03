import React from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components";

// Added explicit width to align title properly pending icon rework.
const TabIconContainer = styled.span`
  display: flex;
  align-items: center;
  width: 25px;
`;

TabIcon.propTypes = {
  name: PropTypes.string
};

function TabIcon({ name }) {
  return <TabIconContainer />;
}

export default TabIcon;
