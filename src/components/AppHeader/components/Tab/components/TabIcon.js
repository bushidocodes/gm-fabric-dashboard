import React from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components";

const TabIconContainer = styled.span`
  display: flex;
  align-items: center;
`;

TabIcon.propTypes = {
  name: PropTypes.string
};

function TabIcon({ name }) {
  return <TabIconContainer />;
}

export default TabIcon;
