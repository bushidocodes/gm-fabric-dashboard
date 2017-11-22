import styled from "styled-components";
import { PropTypes } from "prop-types";

import { hide } from "components/globalPatterns";

const Breadcrumbs = styled.ol`
  flex: 1 1 auto;
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: row;
  height: inherit;
  align-items: stretch;

  > li:first-child {
    ${props => (props.hideRoot ? hide : "")};
  }
`;

Breadcrumbs.propTypes = {
  hideRoot: PropTypes.bool
};

export default Breadcrumbs;
