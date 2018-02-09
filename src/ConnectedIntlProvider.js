import React from "react";
import PropTypes from "prop-types";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";

import { flattenMessages } from "./utils/i18n";
import messages from "./messages";

function ConnectedIntlProvider({ locale, children }) {
  return (
    <IntlProvider
      locale={locale}
      key={locale} // this key is important because forces React to create a new instance and re-render the whole DOM tree when the locale changes
      messages={flattenMessages(messages[locale])}
    >
      {children}
    </IntlProvider>
  );
}

ConnectedIntlProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  locale: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    locale: state.settings.locale
  };
}

export default connect(mapStateToProps)(ConnectedIntlProvider);
