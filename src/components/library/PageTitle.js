import { PropTypes } from "prop-types";
import React from "react";
import styled from "styled-components";
import { spacingScale } from "../../style/styleFunctions";

const PageTitleDiv = styled.h1`
  padding: ${spacingScale(1)} ${spacingScale(2)};
  line-height: ${spacingScale(5)};
  margin: 0;
`;

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
};

/**
 * Full width title component intended to be displayed at the top of the main view area 
 * just beneath the header
 * @param {*} props - see propTypes 
 */
function PageTitle({ title }) {
  return <PageTitleDiv>{title}</PageTitleDiv>;
}

export default PageTitle;
