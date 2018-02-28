import React from "react";
import { PropTypes } from "prop-types";

import LayoutSectionWrap from "./components/LayoutSectionWrap";
import Header from "./components/Header";
import SectionContent from "./components/SectionContent";
import SectionIcon from "./components/SectionIcon";
import SectionTitle from "./components/SectionTitle";
import Icon from "components/Icon";
import Glyph from "components/Glyphs/";

LayoutSection.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  className: PropTypes.string,
  flex: PropTypes.bool,
  icon: PropTypes.string,
  stretch: PropTypes.bool,
  title: PropTypes.string.isRequired
};

/**
 * Section of a static dashboard, complete with header and icon
 * @param {Object} props - refer to propTypes
 */

function LayoutSection({
  children,
  title,
  icon,
  flex = false,
  stretch = false
}) {
  return (
    <LayoutSectionWrap stretch={stretch}>
      {title && (
        <Header>
          {icon && (
            <SectionIcon>
              <Icon>
                <Glyph name={icon} />
              </Icon>
            </SectionIcon>
          )}
          <SectionTitle>{title}</SectionTitle>
        </Header>
      )}
      <SectionContent flex={flex}>{children}</SectionContent>
    </LayoutSectionWrap>
  );
}

export default LayoutSection;
