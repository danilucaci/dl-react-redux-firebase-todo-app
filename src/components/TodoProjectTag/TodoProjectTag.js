import React from "react";
import { string } from "prop-types";
import classNames from "classnames";

import "./TodoProjectTag.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";

function TodoProjectTag({
  projectName,
  projectColorValue,
  iconSide,
  buttonAdditionalClasses,
  iconAdditionalClasses,
  ...props
}) {
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
    <button className={buttonClassNames} type="button" {...props}>
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
  );
}

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
