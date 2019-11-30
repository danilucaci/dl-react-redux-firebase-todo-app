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

import "./CurrentUserAvatar.styles.scss";
import avatarPlaceholder from "../../assets/img/avatar-placeholder.png";
import { getClassesFromProps } from "../../utils/helpers";
import * as ROUTES from "../../constants/routes";
import UserAvatarContainer from "../../redux/containers/components/UserAvatarContainer";

function CurrentUserAvatar({
  currentUser: { avatar = "", displayName = "" } = {},
  logoutUser,
  additionalClasses,
}) {
  const addedClasses = getClassesFromProps(additionalClasses);
  const imageRef = useRef(null);

  const buttonClassNames = classNames({
    CurrentUserAvatar: true,
    ...addedClasses,
  });

  const imageClassNames = classNames({
    CurrentUserAvatar__Image: true,
    [`CurrentUserAvatar__Image--Loaded`]: avatar ? true : false,
    ...addedClasses,
  });

  function handleImageError() {
    if (imageRef.current) {
      imageRef.current.src = avatarPlaceholder;
    }
  }

  return (
    <Menu>
      <MenuButton className="CurrentUserAvatar__Button">
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
      <MenuList className="CurrentUserAvatar__List">
        <div className="CurrentUserAvatar__Info">
          <UserAvatarContainer />
        </div>

        <span className="CurrentUserAvatar__Divider" />

        <MenuLink className="CurrentUserAvatar__Item" href={ROUTES.PROFILE}>
          <svg className="CurrentUserAvatar__Icon">
            <use xlinkHref="#settings" />
          </svg>
          My account
        </MenuLink>
        <span className="CurrentUserAvatar__Divider" />
        <MenuItem className="CurrentUserAvatar__Item" onSelect={logoutUser}>
          <svg className="CurrentUserAvatar__Icon">
            <use xlinkHref="#sign-out" />
          </svg>
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

CurrentUserAvatar.propTypes = {
  additionalClasses: string,
  currentUser: shape({
    avatar: string,
    displayName: string,
  }),
};

CurrentUserAvatar.defaultProps = {
  additionalClasses: null,
  currentUser: {
    avatar: "",
    displayName: "",
  },
};

export default CurrentUserAvatar;
