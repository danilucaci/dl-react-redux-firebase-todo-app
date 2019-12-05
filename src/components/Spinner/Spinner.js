import React from "react";
import { string } from "prop-types";
import classNames from "classnames";

import "./Spinner.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";

function Spinner({ ariaText, additionalClasses, ...props }) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const svgClassNames = classNames({
    Spinner: true,
    ...addedClasses,
  });

  return (
    <svg className={svgClassNames} {...props}>
      <use xlinkHref="#loading" />
    </svg>
  );
}

Spinner.propTypes = {
  additionalClasses: string,
};

Spinner.defaultProps = {
  additionalClasses: null,
};

export default Spinner;
