import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  COLOR_BRAND_PRIMARY,
  COLOR_DANGER
} from "../../../../../style/styleVariables";

const GMLink = styled(Link)`
  width: 100%;
  cursor: ${props => props.cursor};
  text-decoration: none;
  color: black;
  display: flex;
  &:hover {
    color: ${props =>
      props.disabled ? COLOR_DANGER.string() : COLOR_BRAND_PRIMARY.string()};
  }
`;

export default GMLink;
