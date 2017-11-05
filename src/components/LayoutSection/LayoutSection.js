import React from "react";
import { PropTypes } from "prop-types";

import LayoutSectionWrap from "./components/LayoutSectionWrap";
import Header from "./components/Header";
import SectionContent from "./components/SectionContent";
import SectionIcon from "./components/SectionIcon";
import SectionTitle from "./components/SectionTitle";

LayoutSection.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  className: PropTypes.string,
  flex: PropTypes.bool,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired
};

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
