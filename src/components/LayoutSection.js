import React from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import { spacingScale, contrastColor } from "../style/styleFunctions";
import {
  COLOR_CONTENT,
  COLOR_CONTENT_BACKGROUND,
  FONT_SIZE_LG
} from "../style/styleVariables";

LayoutSection.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  className: PropTypes.string,
  flex: PropTypes.bool,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired
};

const LayoutSectionWrap = styled.section`
  margin-bottom: ${spacingScale(4)};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: ${COLOR_CONTENT.string()};
`;
const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${(spacingScale(1), spacingScale(2))};
  border-top: 1px solid
    ${contrastColor(COLOR_CONTENT_BACKGROUND, 0.15).string()};
`;
const SectionIcon = styled.span`
  flex: 0 0 auto;
  padding-right: ${spacingScale(1)} !important;
`;
const SectionTitle = styled.h3`
  color: inherit;
  font-size: ${FONT_SIZE_LG};
  margin: 0;
`;

//the id selectors here are a fix until view-app-settings.scss is refactored
const SectionContent = styled.div`
  padding: ${spacingScale(1)};
  ${props =>
    props.flex
      ? "display: flex; flex-direction: row; justify-content: center;"
      : ""};
  > #ctrl-slider {
    flex: 0 1 50%;
  }
  > #ctrl-btn {
    flex: 0 0 160px;
  }
`;

/**
 * Section of a static dashboard, complete with header and icon
 * @param {Object} props - refer to propTypes
 */

function LayoutSection({ children, title, icon, flex = false }) {
  return (
    <LayoutSectionWrap>
      <Header>
        {icon ? (
          <SectionIcon>
            <img src={icon} alt="" />
          </SectionIcon>
        ) : (
          <SectionIcon data-uk-icon={`icon: grid; ratio: 1`} />
        )}
        <SectionTitle>{title}</SectionTitle>
      </Header>
      <SectionContent flex={flex}>{children}</SectionContent>
    </LayoutSectionWrap>
  );
}

export default LayoutSection;
