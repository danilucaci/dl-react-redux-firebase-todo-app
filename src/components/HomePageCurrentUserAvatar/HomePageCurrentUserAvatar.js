import React, { useRef } from "react";
import { string, shape } from "prop-types";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuLink,
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import classNames from "classnames";

import "./HomePageCurrentUserAvatar.styles.scss";
import avatarPlaceholder from "../../assets/img/avatar-placeholder.png";
import { getClassesFromProps } from "../../utils/helpers";
import * as ROUTES from "../../constants/routes";
import UserAvatarContainer from "../../redux/containers/components/UserAvatarContainer";

function HomePageCurrentUserAvatar({
  currentUser: { avatar = "", displayName = "" } = {},
  logoutUser,
  additionalClasses,
}) {
  const addedClasses = getClassesFromProps(additionalClasses);
  const imageRef = useRef(null);

  const buttonClassNames = classNames({
    HomePageCurrentUserAvatar: true,
    ...addedClasses,
  });

  const imageClassNames = classNames({
    HomePageCurrentUserAvatar__Image: true,
    [`HomePageCurrentUserAvatar__Image--Loaded`]: avatar ? true : false,
    ...addedClasses,
  });

  function handleImageError() {
    if (imageRef.current) {
      imageRef.current.src = avatarPlaceholder;
    }
  }

  return (
    <Menu>
      <MenuButton className="HomePageCurrentUserAvatar__Button">
        <div className={buttonClassNames}>
          <img
            className={imageClassNames}
            src={avatar ? avatar : avatarPlaceholder}
            alt={`Open account page`}
            ref={imageRef}
            onError={handleImageError}
          />
        </div>
      </MenuButton>
      <MenuList className="HomePageCurrentUserAvatar__List">
        <div className="HomePageCurrentUserAvatar__Info">
          <UserAvatarContainer />
        </div>

        <span className="HomePageCurrentUserAvatar__Divider" />

        <MenuLink
          className="HomePageCurrentUserAvatar__Item"
          href={ROUTES.INBOX}
        >
          <svg className="HomePageCurrentUserAvatar__Icon">
            <use xlinkHref="#home" />
          </svg>
          Inbox
        </MenuLink>
        <MenuLink
          className="HomePageCurrentUserAvatar__Item"
          href={ROUTES.PROFILE}
        >
          <svg className="HomePageCurrentUserAvatar__Icon">
            <use xlinkHref="#settings" />
          </svg>
          My account
        </MenuLink>
        <span className="HomePageCurrentUserAvatar__Divider" />
        <MenuItem
          className="HomePageCurrentUserAvatar__Item"
          onSelect={logoutUser}
        >
          <svg className="HomePageCurrentUserAvatar__Icon">
            <use xlinkHref="#sign-out" />
          </svg>
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

HomePageCurrentUserAvatar.propTypes = {
  additionalClasses: string,
  currentUser: shape({
    avatar: string,
    displayName: string,
  }),
};

HomePageCurrentUserAvatar.defaultProps = {
  additionalClasses: null,
  currentUser: {
    avatar: "",
    displayName: "",
  },
};

export default HomePageCurrentUserAvatar;
