import React from "react";
import { string } from "prop-types";
import classNames from "classnames";

import "./OrDivider.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";

function OrDivider({ additionalClasses }) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const dividerClassNames = classNames({
    OrDivider: true,
    ...addedClasses,
  });

  return (
    <div className={dividerClassNames}>
      <span className="OrDivider--Left" aria-hidden="true" />
      <p className="OrDivider--Text">or</p>
      <span className="OrDivider--Right" aria-hidden="true" />
    </div>
  );
}

OrDivider.propTypes = {
  additionalClasses: string,
};

OrDivider.defaultProps = {
  additionalClasses: null,
};

export default OrDivider;
