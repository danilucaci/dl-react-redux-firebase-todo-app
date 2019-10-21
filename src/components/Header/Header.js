import React from "react";
import { useDispatch } from "react-redux";
import "./Header.styles.scss";

import Logo from "../Logo/Logo";
import IconButton from "../IconButton/IconButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SearchBar from "../SearchBar/SearchBar";
import {
  toggleMenu,
  openAddTodoModal,
} from "../../redux/localState/localState-actions";

function Header() {
  const dispatch = useDispatch();

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
            <PrimaryButton
              icon="add-24"
              additionalClasses="PrimaryButton--Medium AddTodoDesktop"
              onClick={() => dispatch(openAddTodoModal())}
            >
              New todo
            </PrimaryButton>
            <IconButton
              icon="add-24"
              additionalClasses="IconButton--Medium AddTodoMobile"
              ariaText="Add a new todo"
              onClick={() => dispatch(openAddTodoModal())}
            />
            <IconButton
              icon="search-24"
              additionalClasses="IconButton--Medium SearchButton"
              ariaText="Search todos"
              onClick={() => console.log("Searching...")}
            />
            <IconButton
              icon="menu"
              additionalClasses="IconButton--Medium Menu"
              ariaText="Open menu"
              onClick={() => dispatch(toggleMenu())}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
