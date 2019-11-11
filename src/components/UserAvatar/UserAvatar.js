import React from "react";

import "./UserAvatar.styles.scss";
import avatarPlaceholder from "../../assets/img/avatar-placeholder.png";

function UserAvatar({
  currentUser: { avatar = "", displayName = "", email = "" } = {},
}) {
  return (
    <div className="UserAvatar">
      <img
        className="UserAvatar__Image"
        src={avatar ? avatar : avatarPlaceholder}
        alt={`${displayName}’s profile`}
      />
      <div className="UserAvatar__Copy">
        <p className="UserAvatar__Name">{displayName}</p>
        {email && <p className="UserAvatar__Email">{email}</p>}
      </div>
    </div>
  );
}

export default UserAvatar;
