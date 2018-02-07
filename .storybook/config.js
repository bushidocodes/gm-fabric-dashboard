import * as storybook from "@storybook/react";
import { configure, addDecorator } from "@storybook/react";
import { setDefaults } from "@storybook/addon-info";
import { setOptions } from "@storybook/addon-options";
import { setIntlConfig, withIntl } from "storybook-addon-intl";
import messages from "messages";
import { flattenMessages } from "utils/i18n";
import { addLocaleData } from "react-intl";
import enLocaleData from "react-intl/locale-data/en";
import esLocaleData from "react-intl/locale-data/es";

const req = require.context("../src", true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
  // require("../stories");
}

addLocaleData(enLocaleData);
addLocaleData(esLocaleData);

const getMessages = locale => flattenMessages(messages[locale]);

// Set intl configuration
setIntlConfig({
  locales: ["en-US", "es-ES"],
  defaultLocale: "en-US",
  getMessages
});

// Register decorator
addDecorator(withIntl);

// addon-info
setDefaults({
  header: true, // Toggles display of header with component name and description
  inline: false, // Displays info inline vs click button to view
  source: true, // Displays the source of story Component
  propTables: [
    /* Components used in story */
  ], // displays Prop Tables with this components
  propTablesExclude: [], // Exclude Components from being shoun in Prop Tables section
  styles: {}, // Overrides styles of addon
  marksyConf: {}, // Overrides components used to display markdown. Warning! This option's name will be likely deprecated in favor to "components" with the same API in 3.3 release. Follow this PR #1501 for details
  maxPropsIntoLine: 1, // Max props to display per line in source code
  maxPropObjectKeys: 10,
  maxPropArrayLength: 10,
  maxPropStringLength: 100
});

// Options:
setOptions({
  /**
   * name to display in the top left corner
   * @type {String}
   */
  name: "GM Fabric Dashboard Storybook",
  /**
   * URL for name in top left corner to link to
   * @type {String}
   */
  url: "#",
  /**
   * show story component as full screen
   * @type {Boolean}
   */
  goFullScreen: false,
  /**
   * display left panel that shows a list of stories
   * @type {Boolean}
   */
  showLeftPanel: true,
  /**
   * display horizontal panel that displays addon configurations
   * @type {Boolean}
   */
  showDownPanel: true,
  /**
   * display floating search box to search through stories
   * @type {Boolean}
   */
  showSearchBox: false,
  /**
   * show horizontal addons panel as a vertical panel on the right
   * @type {Boolean}
   */
  downPanelInRight: false,
  /**
   * sorts stories
   * @type {Boolean}
   */
  sortStoriesByKind: false,
  /**
   * regex for finding the hierarchy separator
   * @example:
   *   null - turn off hierarchy
   *   /\// - split by `/`
   *   /\./ - split by `.`
   *   /\/|\./ - split by `/` or `.`
   * @type {Regex}
   */
  hierarchySeparator: null,

  /**
   * sidebar tree animations
   * @type {Boolean}
   */
  sidebarAnimations: true,

  /**
   * id to select an addon panel
   * @type {String}
   */
  selectedAddonPanel: undefined // The order of addons in the "Addons Panel" is the same as you import them in 'addons.js'. The first panel will be opened by default as you run Storybook
});

storybook.configure(loadStories, module);
