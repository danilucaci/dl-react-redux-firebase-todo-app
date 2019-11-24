import React from "react";
import { string, func, array } from "prop-types";
import classNames from "classnames";
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import "@reach/menu-button/styles.css";

import "./TodoProjectTag.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";

function areEqual(a, b) {
  return a === b;
}

const TodoProjectTag = ({
  projectID,
  projectName,
  projectColorValue,
  iconSide,
  buttonAdditionalClasses,
  iconAdditionalClasses,
  toggleVisibility,
  onChangeHandler,
  projects,
  dispatch,
  ...props
}) => {
  const buttonAddedClasses = getClassesFromProps(buttonAdditionalClasses);
  const iconAddedClasses = getClassesFromProps(iconAdditionalClasses);

  const buttonClassNames = classNames({
    Todo__Project__Tag: true,
    ...buttonAddedClasses,
  });

  const iconClassNames = classNames({
    Todo__Project__Tag__Icon: true,
    Todo__Project__Tag__Icon__RightSide: iconSide === "right",
    Todo__Project__Tag__Icon__LeftSide: iconSide === "left",
    ...iconAddedClasses,
  });

  return (
    <Menu>
      <MenuButton
        className={buttonClassNames}
        type="button"
        onClick={toggleVisibility}
        {...props}
      >
        {iconSide === "left" ? (
          <>
            <svg className={iconClassNames} fill={projectColorValue}>
              <use xlinkHref="#color" />
            </svg>
            {projectName}
          </>
        ) : (
          <>
            {projectName}
            <svg className={iconClassNames} fill={projectColorValue}>
              <use xlinkHref="#color" />
            </svg>
          </>
        )}
        <MenuList className="Todo__Project__Tag__List">
          {projects &&
            projects.map((project) => (
              <MenuItem
                className="Todo__Project__Tag__Item"
                key={project.id}
                onSelect={() => onChangeHandler(project)}
              >
                <svg
                  className="Todo__Project__Tag__Item__ColorIcon"
                  fill={project.color.colorValue}
                >
                  <use xlinkHref="#color" />
                </svg>
                <span className="Todo__Project__Tag__Item__Name">
                  {project.name}
                </span>
                {areEqual(projectID, project.id) && (
                  <svg className="Todo__Project__Tag__Item__Check">
                    <use xlinkHref="#check-24" />
                  </svg>
                )}
              </MenuItem>
            ))}
        </MenuList>
      </MenuButton>
    </Menu>
  );
};

TodoProjectTag.propTypes = {
  projectName: string.isRequired,
  projectColorValue: string,
  iconSide: string,
  buttonAdditionalClasses: string,
  iconAdditionalClasses: string,
  toggleVisibility: func,
  onChangeHandler: func,
  projects: array,
  projectID: string,
};

TodoProjectTag.defaultProps = {
  projectColorValue: null,
  iconSide: "left",
  buttonAdditionalClasses: null,
  iconAdditionalClasses: null,
  toggleVisibility: null,
  onChangeHandler: null,
  projects: null,
  projectID: "",
};

export default TodoProjectTag;
