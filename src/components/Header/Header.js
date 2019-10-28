import React from "react";
import "./Header.styles.scss";

import Logo from "../Logo/Logo";
import IconButton from "../IconButton/IconButton";
import MenuButtonContainer from "../../redux/containers/components/MenuButtonContainer";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SearchBar from "../SearchBar/SearchBar";

function Header({ openAddTodoModal }) {
  return (
    <header className="Site__Header" role="banner">
      <nav
        className="Site__Header__Nav row row--contain-10"
        aria-label="Page Menu"
        role="navigation"
      >
        <Logo />
        <div className="Site__Header__Search__Buttons col col-8 col-l-5 col-xl-8">
          <SearchBar />
          <div className="Site__Header__Buttons__Wrapper">
            <PrimaryButton
              icon="add-24"
              additionalClasses="PrimaryButton--Medium AddTodoDesktop"
              onClick={() => openAddTodoModal()}
            >
              New todo
            </PrimaryButton>
            <IconButton
              icon="add-24"
              additionalClasses="IconButton--Medium AddTodoMobile"
              ariaText="Add a new todo"
              onClick={() => openAddTodoModal()}
            />
            <IconButton
              icon="search-24"
              additionalClasses="IconButton--Medium SearchButton"
              ariaText="Search todos"
              onClick={() => console.log("Searching...")}
            />
            <MenuButtonContainer additionalClasses="Menu" />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
