import React from "react";
import "./Header.styles.scss";

import Logo from "../Logo/Logo";
import OutlinedButton from "../OutlinedButton/OutlinedButton";
import LinkButton from "../LinkButton/LinkButton";
import MenuButtonContainer from "../../redux/containers/components/MenuButtonContainer";
import SearchBar from "../SearchBar/SearchBar";
import CurrentUserAvatar from "../CurrentUserAvatar/CurrentUserAvatar";

function Header({ openAddTodoModal, currentUser = {} }) {
  return (
    <header className="Site__Header" role="banner">
      <nav
        className="Site__Header__Nav row row--contain-10"
        aria-label="Page Menu"
        role="navigation"
      >
        <Logo />
        {currentUser ? (
          <div className="Site__Header__Search__Buttons col col-8 col-l-5 col-xl-8">
            <SearchBar />
            <div className="Site__Header__Buttons__Wrapper">
              <OutlinedButton
                iconOnly
                size="m"
                icon="add-24"
                additionalClasses="AddTodoMobile"
                ariaText="Add a new todo"
                onClick={() => openAddTodoModal()}
              />
              <OutlinedButton
                iconOnly
                size="m"
                icon="search-24"
                additionalClasses="SearchButton"
                ariaText="Search todos"
                onClick={() => console.log("Searching...")}
              />
              <CurrentUserAvatar
                currentUser={currentUser}
                additionalClasses="Site__Header__CurrentUserAvatar"
              />
              <MenuButtonContainer additionalClasses="Menu" />
            </div>
          </div>
        ) : (
          <div className="Site__Header__Search__Buttons Site__Header__Login__Buttons__Wrapper col col-8 col-l-5 col-xl-8">
            <LinkButton
              to="/login"
              size="m"
              additionalClasses="Site__Header__LoginButton"
            >
              Login
            </LinkButton>
            <LinkButton
              to="/sign-up"
              size="m"
              additionalClasses="Site__Header__LoginButton"
            >
              Sign up
            </LinkButton>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
