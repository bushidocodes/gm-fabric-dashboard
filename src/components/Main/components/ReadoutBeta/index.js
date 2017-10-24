import React from "react";
import ReadoutContainer from "./components/ReadoutContainer";
import ReadoutItem from "./components/ReadoutItem";
import ReadoutItemIcon from "./components/ReadoutItemIcon";
import ShapeIcon from "./components/ShapeIcon";
import ReadoutItemData from "./components/ReadoutItemData";
import ReadoutItemTitle from "./components/ReadoutItemTitle";
import ReadoutItemValue from "./components/ReadoutItemValue";
import ReadoutItemDetail from "./components/ReadoutItemDetail";
import { PropTypes } from "prop-types";

ReadoutBeta.propTypes = {
  color: PropTypes.string,
  detail: PropTypes.string,
  primary: PropTypes.bool,
  shape: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string
};

export default function ReadoutBeta({
  primary = false,
  shape = "triangle",
  color = "rgba(255,255,255,.95)",
  title = "Uptime",
  value = "6h 7m 31 s",
  detail = "Thu Oct 19 2017 09:56:42"
}) {
  return (
    <ReadoutContainer primary={primary}>
      <ReadoutItem>
        <ReadoutItemIcon>
          <ShapeIcon shape={shape} color={color} />
        </ReadoutItemIcon>
        <ReadoutItemData>
          <ReadoutItemTitle>{title}</ReadoutItemTitle>
          <ReadoutItemValue>{value}</ReadoutItemValue>
          <ReadoutItemDetail>{detail}</ReadoutItemDetail>
        </ReadoutItemData>
      </ReadoutItem>
    </ReadoutContainer>
  );
}
