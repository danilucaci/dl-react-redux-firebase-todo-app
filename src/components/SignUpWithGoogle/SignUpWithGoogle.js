import React from "react";
import { string } from "prop-types";
import classNames from "classnames";

import "./SignUpWithGoogle.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";
import OutlinedButton from "../OutlinedButton/OutlinedButton";

function SignUpWithGoogle({ additionalClasses, ...props }) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const buttonClassNames = classNames({
    SignUpWithGoogle: true,
    ...addedClasses,
  });

  return (
    <OutlinedButton additionalClasses={buttonClassNames} {...props}>
      <svg className="GoogleIcon">
        <use xlinkHref="#google" />
      </svg>
      Sign up with Google
    </OutlinedButton>
  );
}

SignUpWithGoogle.propTypes = {
  additionalClasses: string,
};

SignUpWithGoogle.defaultProps = {
  additionalClasses: null,
};

export default SignUpWithGoogle;
