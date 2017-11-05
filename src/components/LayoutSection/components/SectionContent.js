import styled from "styled-components";

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
      ? "display: flex; flex-direction: row; justify-content: center;"
      : ""};
  > .control-group-polling-interval {
    flex: 0 1 50%;
  }
  > #ctrl-btn {
    flex: 0 0 160px;
  }
`;

export default SectionContent;
