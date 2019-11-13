import React, { useState } from "react";
import { connect } from "react-redux";
import { string } from "prop-types";

import classNames from "classnames";

import "./SignInWithGoogle.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";
import OutlinedButton from "../OutlinedButton/OutlinedButton";
import { signInWithGoogle } from "../../firebase/firebase";
import { currentUserSelector } from "../../redux/user/user-selectors";
import { setAppDataErrors } from "../../redux/localState/localState-actions";

export const mapStateToProps = (state) => ({
  currentUser: currentUserSelector(state),
});

function SignInWithGoogle({
  additionalClasses,
  currentUser = null,
  dispatch,
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
    signInWithGoogle().catch((event) =>
      dispatch(setAppDataErrors(event.message)),
    );
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

export default connect(mapStateToProps)(SignInWithGoogle);
