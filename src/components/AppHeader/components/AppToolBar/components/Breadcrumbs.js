import styled from "styled-components";
import { hide } from "./../../../../library/globalPatterns";
const Breadcrumbs = styled.ol`
  flex: 1 1 auto;
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: row;
  height: inherit;
  align-items: stretch;

  > li:first-child {
    ${props => (props.hideRoot ? hide() : "")};
  }
`;

export default Breadcrumbs;
