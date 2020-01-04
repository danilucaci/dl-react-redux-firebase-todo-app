import React from "react";
import { shape, bool } from "prop-types";
import "./HomePageHeader.styles.scss";

import Logo from "../Logo/Logo";
import LinkButton from "../LinkButton/LinkButton";
import HomePageCurrentUserAvatarContainer from "../../redux/containers/components/HomePageCurrentUserAvatarContainer";

function HomePageHeader({ userState: { isAuthenticated } = {} }) {
  return (
    <header className="HomePageHeader" role="banner">
      <nav
        className="HomePageHeader__Nav row row--contain-12"
        aria-label="Page Menu"
        role="navigation"
      >
        <Logo />
        <div className="HomePageHeader__Buttons col col-8 col-l-5 col-xl-8">
          {isAuthenticated ? (
            <HomePageCurrentUserAvatarContainer additionalClasses="HomePageHeader__CurrentUserAvatar" />
          ) : (
            <>
              <LinkButton to="/login" size="m">
                Login
              </LinkButton>
              <LinkButton
                to="/sign-up"
                size="m"
                additionalClasses="HomePageHeader__SignupButton"
              >
                Sign up
              </LinkButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

HomePageHeader.propTypes = {
  userState: shape({
    isAuthenticated: bool.isRequired,
  }).isRequired,
};

export default HomePageHeader;
