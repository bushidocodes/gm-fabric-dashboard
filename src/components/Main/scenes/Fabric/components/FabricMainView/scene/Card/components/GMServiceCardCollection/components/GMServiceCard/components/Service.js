import styled from "styled-components";
import { Link } from "react-router-dom";

export const ServiceLink = styled(Link)`
  text-decoration: none;
  cursor: ${props => props.cursor};
  color: ${props => props.cardfontcolor};
  z-index: 1;
  &:hover {
    color: ${props => props.cardfontcolor};
  }
`;
export const ServiceInfo = ServiceLink.withComponent("div");
