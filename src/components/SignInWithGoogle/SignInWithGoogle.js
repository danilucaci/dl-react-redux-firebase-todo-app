import React, { useState } from "react";
import { connect } from "react-redux";
import { string } from "prop-types";

import classNames from "classnames";

import "./SignInWithGoogle.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";
import OutlinedButton from "../OutlinedButton/OutlinedButton";
import { currentUserSelector } from "../../redux/user/user-selectors";
import { signUpWithGoogleRequest } from "../../redux/user/user-actions";

export const mapStateToProps = (state) => ({
  currentUser: currentUserSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  signUpWithGoogleRequest: () => dispatch(signUpWithGoogleRequest()),
});

function SignInWithGoogle({
  additionalClasses,
  currentUser = null,
  signUpWithGoogleRequest,
  label = "Sign in with Google",
  ...props
}) {
  const addedClasses = getClassesFromProps(additionalClasses);
  const [loading, setLoading] = useState(false);

  const buttonClassNames = classNames({
    SignInWithGoogle: true,
    ...addedClasses,
  });

  function handleSignInWithGoogle() {
    setLoading(true);

    signUpWithGoogleRequest();
  }

  return (
    <OutlinedButton
      additionalClasses={buttonClassNames}
      onClick={handleSignInWithGoogle}
      disabled={loading}
      {...props}
    >
      <svg className="GoogleIcon">
        <use xlinkHref="#google" />
      </svg>
      {label}
    </OutlinedButton>
  );
}

SignInWithGoogle.propTypes = {
  additionalClasses: string,
  label: string,
};

SignInWithGoogle.defaultProps = {
  additionalClasses: null,
  label: "Sign in with Google",
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInWithGoogle);
