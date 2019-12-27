import React from "react";
import { connect } from "react-redux";
import { string, shape, bool, func } from "prop-types";
import classNames from "classnames";

import "./SignInWithGoogle.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";
import OutlinedButton from "../OutlinedButton/OutlinedButton";
import { currentUserSelector } from "../../redux/user/user-selectors";
import { signUpWithGoogleRequest } from "../../redux/user/user-actions";
import { setLiveRegionMessage } from "../../redux/localState/localState-actions";
import { cookieConsentSelector } from "../../redux/localState/localState-selectors";
import { openCookieConsent } from "../../redux/localState/localState-actions";
import { enqueueSnackbar } from "../../redux/localState/localState-actions";

export const mapStateToProps = (state) => ({
  currentUser: currentUserSelector(state),
  cookieConsent: cookieConsentSelector(state),
});

export const mapDispatchToProps = (dispatch) => ({
  signUpWithGoogleRequest: () => dispatch(signUpWithGoogleRequest()),
  setLiveRegionMessage: (message) => dispatch(setLiveRegionMessage(message)),
  openCookieConsent: () => dispatch(openCookieConsent()),
  enqueueSnackbar: (message) => dispatch(enqueueSnackbar(message)),
});

function SignInWithGoogle({
  additionalClasses,
  currentUser = null,
  signUpWithGoogleRequest,
  setLiveRegionMessage,
  label = "Sign in with Google",
  cookieConsent: { consentAccepted } = {},
  openCookieConsent,
  enqueueSnackbar,
  loading,
  ...props
}) {
  const addedClasses = getClassesFromProps(additionalClasses);

  const buttonClassNames = classNames({
    SignInWithGoogle: true,
    ...addedClasses,
  });

  function handleSignInWithGoogle() {
    if (!consentAccepted) {
      openCookieConsent();
      enqueueSnackbar({
        message: "Please accept the cookie policy before signing in",
        options: {
          variant: "info",
        },
      });
    } else {
      setLiveRegionMessage("Signing in with google");
      signUpWithGoogleRequest();
    }
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
  cookieConsent: shape({
    consentAccepted: bool.isRequired,
  }).isRequired,
  openCookieConsent: func.isRequired,
  enqueueSnackbar: func.isRequired,
  loading: bool.isRequired,
};

SignInWithGoogle.defaultProps = {
  additionalClasses: null,
  label: "Sign in with Google",
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInWithGoogle);
