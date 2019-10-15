import React from "react";
import "./Header.styles.scss";

import Logo from "../Logo/Logo";
import IconButton from "../IconButton/IconButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SearchBar from "../SearchBar/SearchBar";

function Header() {
  return (
    <header className="Site__Header__Wrapper" role="banner">
      <nav
        className="Site__Header__Nav row row--contain-10"
        aria-label="Page Menu"
        role="navigation"
      >
        <Logo />
        <div className="Buttons__Wrapper col col-8 col-m-5 col-xl-8">
          <SearchBar />
          <div className="Buttons">
            <PrimaryButton icon="add-24" additionalClasses={["AddTaskDesktop"]}>
              New task
            </PrimaryButton>
            <IconButton
              icon="add-24"
              additionalClasses={["AddTaskMobile"]}
              ariaText="Add a new task"
            />
            <IconButton
              icon="search-24"
              additionalClasses={["SearchButton"]}
              ariaText="Search todos"
            />
            <IconButton
              icon="menu"
              additionalClasses={["Menu"]}
              ariaText="Open menu"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
