import React from "react";
import { string } from "prop-types";
import classNames from "classnames";

import "./SignInWithGoogle.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";
import OutlinedButton from "../OutlinedButton/OutlinedButton";

function SignInWithGoogle({ additionalClasses, ...props }) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const buttonClassNames = classNames({
    SignInWithGoogle: true,
    ...addedClasses,
  });

  return (
    <OutlinedButton additionalClasses={buttonClassNames} {...props}>
      <svg className="GoogleIcon">
        <use xlinkHref="#google" />
      </svg>
      Sign in with Google
    </OutlinedButton>
  );
}

SignInWithGoogle.propTypes = {
  additionalClasses: string,
};

SignInWithGoogle.defaultProps = {
  additionalClasses: null,
};

export default SignInWithGoogle;
