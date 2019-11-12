import React from "react";
import classnames from "classnames";
import { string } from "prop-types";

import "./SidebarSignoutButton.styles.scss";

import { getClassesFromProps } from "../../utils/helpers";

function SidebarSignoutButton({ additionalClasses, ...props }) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const addNewClasses = classnames({
    SidebarSignoutButton: true,
    ...addedClasses,
  });

  return (
    <button className={addNewClasses} type="button" {...props}>
      <svg className="SidebarSignoutButton__Icon">
        <use xlinkHref="#sign-out" />
      </svg>
      Sign out
    </button>
  );
}

SidebarSignoutButton.propTypes = {
  additionalClasses: string,
};

SidebarSignoutButton.defaultProps = {
  additionalClasses: null,
};

export default SidebarSignoutButton;
