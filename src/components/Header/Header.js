import React from "react";
import "./Header.styles.scss";

import Logo from "../Logo/Logo";
import IconButton from "../IconButton/IconButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

function Header() {
  return (
    <header className="Header">
      <Logo />
      <div className="Buttons">
        <PrimaryButton icon="add">New task</PrimaryButton>
        <IconButton
          icon="add"
          buttonClasses="AddTask"
          ariaText="Add a new task"
        />
        <IconButton
          icon="search"
          buttonClasses="Search"
          ariaText="Search tasks"
        />
        <IconButton icon="menu" buttonClasses="Menu" ariaText="Open menu" />
      </div>
    </header>
  );
}

export default Header;
