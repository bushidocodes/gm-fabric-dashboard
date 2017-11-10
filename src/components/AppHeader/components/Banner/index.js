import { PropTypes } from "prop-types";
import React from "react";

import HeaderContainer from "./components/HeaderContainer";
import Header from "./components/Header";
import BannerArt from "./components/BannerArt";
import Extra from "./components/Extra";

Banner.propTypes = {
  extras: PropTypes.array,
  hideBackground: PropTypes.bool,
  title: PropTypes.string.isRequired
};

/**
 * Stateless functional React component that renders the banner in AppHeader
 * @param {String} props - See propTypes
 * @returns JSX.Element
 */
function Banner({ title, extras, hideBackground = false }) {
  return (
    <HeaderContainer hideBackground={hideBackground}>
      <BannerArt />
      <Header>{title || "—"}</Header>
      {extras && (
        <div>
          {extras.map(extra => (
            <Extra href={extra.path} key={extra.title}>
              {extra.title}
            </Extra>
          ))}
        </div>
      )}
    </HeaderContainer>
  );
}

export default Banner;
