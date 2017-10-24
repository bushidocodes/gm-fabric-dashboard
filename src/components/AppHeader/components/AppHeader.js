import { PropTypes } from "prop-types";
import React from "react";
import styled from "styled-components";
import { COLOR_ALT_BACKGROUND } from "../../../style/styleVariables";
import { contrastColor, spacingScale } from "../../../style/styleFunctions";
import AppToolBar from "./AppToolBar";
import Banner from "./Banner";
import SectionNav from "./SectionNav";
import BannerBackgroundImage from "../../../images/app-banner.png";

export const AppHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-image: url(${BannerBackgroundImage});
  background-size: auto 101px;
  background-repeat: no-repeat;
  background-position: left ${spacingScale(4)};
  background-color: ${COLOR_ALT_BACKGROUND.string()};
`;

/**
 * Stateless functional React component that renders the App Header
 * @returns JSX.Element
 */

const mockTabs = [
  {
    path: "/",
    icon: "grid",
    title: "Summary",
    details: { key: "Uptime", value: "15 Days" },
    chartData: "chart stuff",
    chartTitle: "chart title"
  },
  {
    path: "go",
    icon: "grid",
    title: "Functions",
    details: { key: "Functions", value: "24" },
    chartData: "chart stuff",
    chartTitle: "chart title"
  },
  {
    path: "go",
    icon: "grid",
    title: "Threads",
    details: { key: "Threads", value: "26" },
    chartData: "chart stuff",
    chartTitle: "chart title"
  },
  {
    path: "go",
    icon: "grid",
    title: "HTTP",
    details: { key: "Error Rate", value: "0.121%" },
    chartData: "chart stuff",
    chartTitle: "chart title"
  },
  {
    path: "go",
    icon: "grid",
    title: "JVM",
    details: { key: "Memory Used", value: "116 MB" },
    chartData: "chart stuff",
    chartTitle: "chart title"
  }
];

function AppHeader() {
  return (
    <AppHeaderContainer>
      <AppToolBar pathname="/stuff/things" />
      <Banner title="Security Service: 035nr32" />
      <SectionNav tabs={mockTabs} />
    </AppHeaderContainer>
  );
}

export default AppHeader;
