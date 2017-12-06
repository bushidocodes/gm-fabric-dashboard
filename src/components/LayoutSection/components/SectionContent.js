import styled from "styled-components";
import { PropTypes } from "prop-types";

import { spacingScale } from "style/styleFunctions";
import { CONTENT_MAX_WIDTH } from "style/styleVariables";

//the id selectors here are a fix until view-app-settings.scss is refactored
const SectionContent = styled.div`
  padding: ${spacingScale(1)};
  margin: 0 auto;
  max-width: ${CONTENT_MAX_WIDTH};
  width: 100%;
  ${props =>
    props.flex
      ? `
      display: flex; 
      flex-direction: row; 
      justify-content: center;`
      : ""};
`;

SectionContent.propTypes = {
  flex: PropTypes.bool
};

export default SectionContent;
