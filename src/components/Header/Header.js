import React from "react";
import "./Header.styles.scss";

import Logo from "../Logo/Logo";
import IconButton from "../IconButton/IconButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SearchBar from "../SearchBar/SearchBar";

function Header() {
  return (
    <header className="Header">
      <Logo />
      <SearchBar />
      <div className="Buttons">
        <PrimaryButton icon="add" additionalClasses={["AddTaskDesktop"]}>
          New task
        </PrimaryButton>
        <IconButton
          icon="add"
          additionalClasses={["AddTaskMobile"]}
          ariaText="Add a new task"
        />
        <IconButton
          icon="search"
          additionalClasses={["SearchButton"]}
          ariaText="Search tasks"
        />
        <IconButton
          icon="menu"
          additionalClasses={["Menu"]}
          ariaText="Open menu"
        />
      </div>
    </header>
  );
}

export default Header;
