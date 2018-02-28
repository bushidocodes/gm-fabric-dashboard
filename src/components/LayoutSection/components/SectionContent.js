import styled from "styled-components";
import { PropTypes } from "prop-types";

import { spacingScale } from "style/styleFunctions";

//the id selectors here are a fix until view-app-settings.scss is refactored
const SectionContent = styled.div`
  margin: 0 auto;
  padding: ${spacingScale(1)};
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex: 1 1 100%;
`;

SectionContent.propTypes = {
  flex: PropTypes.bool
};

export default SectionContent;
