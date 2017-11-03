import styled from "styled-components";

import { contrastColor, spacingScale } from "style/styleFunctions";
import { COLOR_ALT_BACKGROUND } from "style/styleVariables";
import { media } from "style/styleVariables";

const APP_TOOLBAR_BACKGROUND_COLOR = COLOR_ALT_BACKGROUND.string();

const Breadcrumb = styled.li`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  color: black;
  ${media.breadcrumbsBreakpoint200`
    max-width: calc(100vw/4);
    overflow: hidden;
  `} ${media.breadcrumbsBreakpointHandheld`
    max-width: calc(100vw/9);
    overflow: hidden;
  `} &:before {
    content: ">";
    transform: scaleX(0.5);
    display: flex;
    color: ${contrastColor(APP_TOOLBAR_BACKGROUND_COLOR, 0.8).string()};
    padding: 0 ${spacingScale(0.5)};
  }
  a {
    display: flex;
    max-width: auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: inherit;
    padding: ${spacingScale(1)} 0;
    color: ${contrastColor(APP_TOOLBAR_BACKGROUND_COLOR, 0.85).string()};
    &:hover {
      color: ${contrastColor(APP_TOOLBAR_BACKGROUND_COLOR, 1).string()};
    }
  }

  &:first-child {
    &:before {
      content: none;
    }
    a {
      padding-left: ${spacingScale(2)};
    }
  }
`;

export default Breadcrumb;
