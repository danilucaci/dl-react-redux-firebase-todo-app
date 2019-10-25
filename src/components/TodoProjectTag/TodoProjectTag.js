import React from "react";
import { string } from "prop-types";
import classNames from "classnames";

import "./TodoProjectTag.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";
import { useRectSize } from "../../hooks";
import ProjectsDropdown from "../ProjectsDropdown/ProjectsDropdown";

const TodoProjectTag = ({
  projectName,
  projectColorValue,
  iconSide,
  buttonAdditionalClasses,
  iconAdditionalClasses,
  isVisible,
  onChangeHandler,
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

  const [projectsTagRef, projectsTagSize] = useRectSize();

  return (
    <>
      <button
        className={buttonClassNames}
        type="button"
        ref={projectsTagRef}
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
      </button>
      {isVisible && (
        <ProjectsDropdown
          onChangeHandler={onChangeHandler}
          position={{
            left: projectsTagSize.left + window.scrollX || 0,
            right: projectsTagSize.right + window.scrollX || 0,
            top: projectsTagSize.top + projectsTagSize.height + 8 || 0,
          }}
        />
      )}
    </>
  );
};

TodoProjectTag.propTypes = {
  projectName: string.isRequired,
  projectColorValue: string,
  iconSide: string,
  buttonAdditionalClasses: string,
  iconAdditionalClasses: string,
};

TodoProjectTag.defaultProps = {
  projectColorValue: null,
  iconSide: "left",
  buttonAdditionalClasses: null,
  iconAdditionalClasses: null,
};

export default TodoProjectTag;
