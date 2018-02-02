import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { addLocaleData, IntlProvider } from "react-intl";

import history from "./AppHistory";
import AppContainer from "./components/AppContainer";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/Footer";
import Notification from "./components/Notification";
import Main from "./components/Main";
import store from "./store";
import { flattenMessages, getLocale } from "./utils/i18n";
import messages from "./messages";
import "./services";

// Look up user locale
const locale = getLocale();

// Format locale string for dynamic import
const localeImport = locale.split("-")[0];

// Import our locale data and register it with react-intl before rendering the App
import(`react-intl/locale-data/${localeImport}`)
  .then(localeData => {
    addLocaleData(...localeData);
    return ReactDOM.render(
      <IntlProvider
        locale={locale}
        messages={flattenMessages(messages[locale])}
      >
        <Provider store={store}>
          <Router history={history}>
            <AppContainer>
              <Notification />
              <AppHeader />
              <Main />
              <AppFooter />
            </AppContainer>
          </Router>
        </Provider>
      </IntlProvider>,
      document.getElementById("root")
    );
  })
  .catch(err => console.error(err));
