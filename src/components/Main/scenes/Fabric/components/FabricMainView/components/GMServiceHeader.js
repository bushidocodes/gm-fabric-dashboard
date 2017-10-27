import React from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components";

import StatusIcon from "../../../../../../StatusIcon";
import ServicesIcon from "../../../../../../../images/icons/services.svg";
import { FONT_SIZE_LG } from "../../../../../../../style/styleVariables";
import { spacingScale } from "../../../../../../../style/styleFunctions";

const Heading = styled.div`
  font-size: ${FONT_SIZE_LG};
  text-align: left;
  vertical-align: text-bottom;
  padding: 0;
  height: ${spacingScale(5)};
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: ${spacingScale(3)};
  height: ${spacingScale(3)};
  position: relative;
  top: -4px;
`;

const HeaderTitle = styled.span`margin-left: ${spacingScale(1)};`;

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
    <Heading>
      {showStatusIcon ? (
        <IconWrapper>
          <StatusIcon status={headerTitle} />
        </IconWrapper>
      ) : (
        <IconWrapper>
          <img src={ServicesIcon} alt="" />
        </IconWrapper>
      )}
      <HeaderTitle>{headerTitle}</HeaderTitle>
    </Heading>
  );
}
