import styled from "styled-components";

import { COLOR_BRAND_PRIMARY, COLOR_WHITE } from "style/styleVariables";
import { contrastColor } from "style/styleFunctions";

const PollingBtnContainer = styled.div`
  align-self: stretch;
  height: 140px;
  width: 160px;
  border: 1px solid ${contrastColor(COLOR_WHITE, 0.1).toString()};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 160px;
  justify-content: center;

  .label {
    position: absolute;
    bottom: 10px;
    width: 100%;
    left: 0px;
  }
  > svg {
    color: ${COLOR_BRAND_PRIMARY.toString()};
    will-change: transform;
    transition: all 0.3s ease;
  }

  &:hover svg,
  &:active svg,
  &:focus svg {
    transition: all 0.1s ease;
    transform: scale(1.1);
  }
  &:active svg {
    transition: all 0;
    transform: scale(1);
  }
`;

export default PollingBtnContainer;
