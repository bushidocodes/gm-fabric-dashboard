import React from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components";

import { contrastColor, spacingScale } from "style/styleFunctions";
import {
  FONT_SIZE_SM,
  FONT_SIZE_LG,
  COLOR_ALT_BACKGROUND,
  COLOR_HIGHLIGHT
} from "style/styleVariables";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine
} from "react-sparklines";
import { NavLink } from "react-router-dom";

const TAB_WIDTH_BASE = "1%";
const COLOR_TAB_BACKGROUND_BASE = contrastColor(COLOR_ALT_BACKGROUND, 0.175);
const COLOR_TAB_BACKGROUND_ACTIVE = contrastColor(COLOR_ALT_BACKGROUND, 0.3);
const COLOR_TAB_HIGHLIGHT = COLOR_HIGHLIGHT;

export const TabNav = styled.div`
  display: flex;
  flex-direction: row;
  color: ${contrastColor(COLOR_TAB_BACKGROUND_BASE).string()};
  flex-wrap: wrap;
  padding: 0 1px 1px 1px;
`;

export const Tab = styled(NavLink).attrs({
  activeStyle: {
    backgroundColor: COLOR_TAB_BACKGROUND_ACTIVE.string(),
    color: COLOR_TAB_HIGHLIGHT,
    fontSize: `15px`,
    cursor: "default"
  }
})`
  flex: 1 1 ${TAB_WIDTH_BASE};
  background-color: ${COLOR_TAB_BACKGROUND_BASE.string()};
  border-top: 1px solid transparent;
  padding: ${spacingScale(0.25)} 0;
  position: relative;
  color: transparent;
  font-weight: 600;
  font-size: 1px;
  transition: all .15s ease;
  margin: 1px 1px 0 0;

  &:after {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    right: 0;
    height: 1px;
    box-shadow: 0 0 1em 1px currentColor;
    border-radius: 10px;
    background-color: currentColor;
    z-index: 100;
    pointer-events: none;
  }

  &:hover {
    background-color: ${COLOR_TAB_BACKGROUND_BASE.mix(
      COLOR_TAB_BACKGROUND_ACTIVE,
      0.3
    ).string()};
    font-size: 15px;
  }

  &:active {
    background-color: ${COLOR_TAB_BACKGROUND_BASE.mix(
      COLOR_ALT_BACKGROUND,
      0.3
    ).string()};
    transition: 0s;
  }
`;

export const TabGroup = styled.div`
  flex: 1 1 ${TAB_WIDTH_BASE};
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const TabIcon = styled.span`
  width: ${spacingScale(4)};
  display: flex;
  align-items: center;
`;

export const TabTitle = styled.h1`
  font-size: ${FONT_SIZE_LG};
  margin: ${spacingScale(0.5)} ${spacingScale(2)} 0;
  color: ${contrastColor(COLOR_TAB_BACKGROUND_BASE, 1).string()};
  white-space: nowrap;
  font-weight: 600;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TabDetails = styled.dl`
  margin: 0 ${spacingScale(2)} ${spacingScale(0.5)};
  font-size: ${FONT_SIZE_SM};
  display: flex;
  color: ${contrastColor(COLOR_TAB_BACKGROUND_BASE, 1).string()};
`;

export const TabKey = styled.dt`
  color: ${contrastColor(COLOR_TAB_BACKGROUND_BASE, 0.8).string()};
  display: inline-block;
  padding-right: ${spacingScale(0.5)};
`;
export const TabVal = styled.dd`
  display: inline-block;
  margin: 0;
`;

export const TabGraph = styled.div`
  color: ${contrastColor(COLOR_TAB_BACKGROUND_BASE, 0.8).string()};
  margin: 0 ${spacingScale(0.25)};
  height: ${spacingScale(3)};
`;

/**
 * Stateless functional React component that renders the navigation tabs in AppHeader
 * @param {Object[]} props - See propTypes
 * @returns JSX.Element
 */
function SectionNav({ tabs = [], secondaryTabs = [] }) {
  return (
    <TabNav>
      {tabs.map(tab => (
        <Tab to={tab.path} key={`${tab.path}|${tab.title}`}>
          {tab.icon ? <TabIcon /> : null}
          <TabTitle>{tab.title || "—"}</TabTitle>
          {tab.details ? (
            <TabDetails>
              <TabKey>{tab.details.key || "— "}</TabKey>
              <TabVal>{tab.details.value || "—"}</TabVal>
            </TabDetails>
          ) : null}
          <TabGraph>
            <Sparklines data={tab.graphData} height={24}>
              <SparklinesLine
                style={{
                  stroke: "currentColor",
                  strokeWidth: 1,
                  fill: "none"
                }}
              />
              <SparklinesReferenceLine
                style={{ stroke: "currentColor", opacity: "0.5" }}
                type="mean"
              />
            </Sparklines>
          </TabGraph>
        </Tab>
      ))}
      {secondaryTabs.length > 0 && (
        <TabGroup>
          {secondaryTabs.map(secondaryTab => (
            <Tab
              to={secondaryTab.path}
              key={`${secondaryTab.path}|${secondaryTab.title}`}
            >
              {secondaryTab.icon ? <TabIcon /> : null}
              <TabTitle>{secondaryTab.title || "—"}</TabTitle>
            </Tab>
          ))}
        </TabGroup>
      )}
    </TabNav>
  );
}

export default SectionNav;

SectionNav.propTypes = {
  secondaryTabs: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  tabs: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
