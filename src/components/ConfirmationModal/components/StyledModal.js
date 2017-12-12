import styled from "styled-components";
import { spacingScale, contrastColor } from "style/styleFunctions";
import { COLOR_ALT_BACKGROUND } from "style/styleVariables";
import Modal from "react-modal";

const modalBackgroundColor = COLOR_ALT_BACKGROUND;
const modalHeightBasis = "400px";
const modalWidthBasis = "500px";

// Add a media query to make left a calc below 600px;
const StyledModal = styled(Modal)`
  backdrop-filter: blur(10px);
  background-color: ${modalBackgroundColor.fade(0.15).string()};
  border-radius: 3px;
  color: ${contrastColor(modalBackgroundColor, 0.95).string()};
  display: flex;
  flex-direction: column;
  height: ${modalHeightBasis};
  left: 50%;
  margin-top: -${parseInt(modalHeightBasis, 10) / 2}px;
  opacity: 0;
  padding: ${spacingScale(3)};
  position: absolute;
  top: 70vh;
  transform: translateX(-50%) translateY(50px) scale(0.98);
  transition: all 0.2s ease;
  width: ${modalWidthBasis};

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    top: 80vh;
    width: 80vw;
  }

  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    top: 60vh;
    width: 80vw;
  }

  > [class*="Content"] > * {
    position: relative;
    top: 0.5em;
    transition: all 0.4s cubic-bezier(0.1, 0.5, 0.2, 1.3);
    transition: all 0.4s ease;
  }

  [class*="after-open"] > & {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);

    &:focus {
      outline: 0;
    }

    > [class*="Content"] > * {
      top: 0;
    }
  }

  [class*="after-close"] > & {
    opacity: 0;
    transform: translateX(-50%) translateY(0) scale(0.5);

    > [class*="Content"] > * {
      top: 1em;
    }
  }
`;

export default StyledModal;
