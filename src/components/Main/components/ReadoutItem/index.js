import React from "react";
import { PropTypes } from "prop-types";

import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine
} from "react-sparklines";

import ReadoutItemContainer from "./components/ReadoutItemContainer";
import ReadoutItemData from "./components/ReadoutItemData";
import ReadoutItemGraph from "./components/ReadoutItemGraph";
import ReadoutItemIcon from "./components/ReadoutItemIcon";
import ReadoutItemTitle from "./components/ReadoutItemTitle";
import ReadoutItemValue from "./components/ReadoutItemValue";
import ReadoutItemDetail from "./components/ReadoutItemDetail";

//  TO-DO:  icon name, shape, color and other icon specifics are to be passed to getIcon component that renders svg element
// when we have "future", "bolt", "warning", "server", "link" svg elements...

export default function ReadoutItem({
  icon,
  iconName,
  iconShape,
  iconColor,
  title,
  value,
  detail,
  graphData
}) {
  return (
    <ReadoutItemContainer>
      {icon && <ReadoutItemIcon icon={icon} />}
      <ReadoutItemData>
        <ReadoutItemTitle>{title || "—"}</ReadoutItemTitle>
        <ReadoutItemValue>{value || "—"}</ReadoutItemValue>
        {detail && <ReadoutItemDetail>{detail}</ReadoutItemDetail>}
        {graphData && (
          <ReadoutItemGraph>
            <Sparklines data={graphData} height={32}>
              <SparklinesLine
                style={{ stroke: "currentColor", strokeWidth: 1, fill: "none" }}
              />
              <SparklinesReferenceLine
                style={{ stroke: "grey", opacity: "0.4" }}
                type="mean"
              />
            </Sparklines>
          </ReadoutItemGraph>
        )}
      </ReadoutItemData>
    </ReadoutItemContainer>
  );
}

ReadoutItem.propTypes = {
  detail: PropTypes.string,
  graphData: PropTypes.array,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  iconName: PropTypes.string,
  iconShape: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
