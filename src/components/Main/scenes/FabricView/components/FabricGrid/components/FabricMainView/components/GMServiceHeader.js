import React, { Fragment } from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components";

import StatusIcon from "components/StatusIcon";
import { spacingScale } from "style/styleFunctions";
import { FONT_SIZE_BASE } from "style/styleVariables";

import ServicesIcon from "images/icons/services.svg";

const HeaderTitle = styled.h1`
  margin-left: ${spacingScale(0.5)};
  text-transform: capitalize;
  font-size: ${FONT_SIZE_BASE};
  font-weight: 500;
`;

GMServiceHeader.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  showStatusIcon: PropTypes.bool
};

/**
 * Grouping header with icon and title
 */
export default function GMServiceHeader({
  headerTitle,
  showStatusIcon = false
}) {
  return (
    <Fragment>
      {showStatusIcon ? (
        <StatusIcon status={headerTitle} />
      ) : (
        <img src={ServicesIcon} alt="" />
      )}
      <HeaderTitle>{headerTitle}</HeaderTitle>
    </Fragment>
  );
}
