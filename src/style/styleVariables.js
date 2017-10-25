import Color from "color";

import { contrastColor } from "./styleFunctions";
import { injectGlobal } from "styled-components";
import Nunito400 from "./fonts/Nunito/Nunito-Regular.ttf";
import Nunito600 from "./fonts/Nunito/Nunito-SemiBold.ttf";
import Rubik400 from "./fonts/Rubik/Rubik-Regular.ttf";
import Rubik500 from "./fonts/Rubik/Rubik-Medium.ttf";
import Rubik700 from "./fonts/Rubik/Rubik-Bold.ttf";
import SourceCodePro400 from "./fonts/Source_Code_Pro/SourceCodePro-Regular.ttf";

export const COLOR_BRAND_PRIMARY = Color("#0aab2a");
export const COLOR_BRAND_SECONDARY = Color("#002e6e");

export const COLOR_RED = Color("#E4251A");
export const COLOR_BLACK = Color("#000");
export const COLOR_GREEN = Color("#0aab2a");
export const COLOR_WHITE = Color("#fff");

export const COLOR_HIGHLIGHT = COLOR_BRAND_PRIMARY;
export const COLOR_SUCCESS = Color("#0aab2a");
export const COLOR_DANGER = Color("red");
export const COLOR_WARNING = Color("#FAC60F");
export const COLOR_INFO = Color("blue");

// Z-Index Mapping
export const ZINDEX_DROPDOWN = "1000";
export const ZINDEX_STICKY = "1020";
export const ZINDEX_FIXED = "1030";
export const ZINDEX_MODAL_BACKDROP = "1040";
export const ZINDEX_MODAL = "1050";
export const ZINDEX_POPOVER = "1060";
export const ZINDEX_TOOLTIP = "1070";

// Theme Configuration
export const COLOR_ALT_BACKGROUND = COLOR_BLACK;
export const COLOR_ALT_CONTENT = COLOR_WHITE;
export const COLOR_CONTENT_BACKGROUND = COLOR_WHITE;

export const BORDER_RADIUS_BASE = "3px";
export const PADDING_BASE = "8px";

// Contrasts
export const DARK_ON_LIGHT_CONTRAST_ENHANCEMENT_RATIO = 2;
export const CONTRAST_INTERVAL = "4%";
export const COLOR_CONTENT = contrastColor(COLOR_CONTENT_BACKGROUND, 0.875);
export const COLOR_CONTENT_MUTED = contrastColor(COLOR_CONTENT_BACKGROUND, 0.7);

// Typography

// Inject custom font-faces directly into the global CSS generated by styled-components
// See injectGlobal in https://www.styled-components.com/docs/api

// Backup font list
export const FONT_GROUP_SYSTEM = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`;

// Fonts for specific use
export const FONT_GROUP_MAIN_TEXT = "Nunito";
export const FONT_GROUP_DATA = "Rubik";
export const FONT_GROUP_CODE = `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`;
export const FONT_GROUP_DATA_MONO = "Source Code Pro";

export const FONT_STACK_BASE = `${FONT_GROUP_MAIN_TEXT}, ${FONT_GROUP_SYSTEM}`;
export const FONT_STACK_DATA = `${FONT_GROUP_DATA}, ${FONT_GROUP_SYSTEM}`;
export const FONT_STACK_DATA_MONO = `${FONT_GROUP_DATA_MONO}, ${FONT_GROUP_DATA}, ${FONT_GROUP_SYSTEM}`;
export const FONT_STACK_CODE = FONT_GROUP_CODE;

export const LINE_HEIGHT_BASE = 1.4;
export const FONT_WEIGHT_BASE = 500;
export const FONT_SIZE_HERO = "32px";
export const FONT_SIZE_LG = "18px";
export const FONT_SIZE_BASE = "14px";
export const FONT_SIZE_SM = "11px";
export const FONT_SIZE_XS = "9px";

injectGlobal`
  @font-face {
    font-family: "Nunito";
    font-style: normal;
    font-weight: 400;
    src: url(${Nunito400});
  }
  @font-face {
    font-family: "Nunito";
    font-style: normal;
    font-weight: 600;
    src: url(${Nunito600});
  }
  @font-face {
    font-family: "Rubik";
    font-style: normal;
    font-weight: 400;
    src: url(${Rubik400});
  }
  @font-face {
    font-family: "Rubik";
    font-style: normal;
    font-weight: 500;
    src: url(${Rubik500})
  }
  @font-face {
    font-family: "Rubik";
    font-style: normal;
    font-weight: 700;
    src: url(${Rubik700});
  }
  @font-face {
    font-family: "SourceCodePro";
    font-style: normal;
    font-weight: 400;
    src: url(${SourceCodePro400});
  }

  *, *:before, *:after{
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
  }

  html {
    font-family: ${FONT_STACK_BASE};
    font-size: ${FONT_SIZE_BASE};
  }

  :root,
  html,
  body,
  #root {
    -webkit-overflow-scrolling: auto;
    overflow: hidden;
    position: absolute;
    height: 100% !important;
    width: 100% !important;
    -ms-overflow-style: none;
  }

  a {
    text-decoration: none;
  }

`;
