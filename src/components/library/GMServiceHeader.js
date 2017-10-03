import React from "react";
import { PropTypes } from "prop-types";
import StatusIcon from "./StatusIcon";

import styled from "styled-components";
import ServicesIcon from "../../images/icons/services.svg";

const Heading = styled.div`
  font-size: 1.5em;
  text-align: left;
  color: gray;
  vertical-align: text-bottom;
  padding: 0 0 0 0px;
  height: 40px;
`;

const IconWrapper = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
`;

const HeaderTitle = styled.span`padding: 0 0 0 10px;`;

GMServiceHeader.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  showStatusIcon: PropTypes.bool
};

/**
 * Grouping header with icon and headerTitle
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
