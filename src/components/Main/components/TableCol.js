import styled from "styled-components";

import { rowChildSpacing, spacingScale } from "../../../style/styleFunctions";

const TableCol = styled.div`
  flex: ${props => (props.sm ? "1 1 5%" : props.lg ? "1 1 30%" : "1 1 15%")};
  ${props =>
    props.header ? `min-height:${spacingScale(4.5)};${rowChildSpacing()}` : ""};
`;

export default TableCol;
