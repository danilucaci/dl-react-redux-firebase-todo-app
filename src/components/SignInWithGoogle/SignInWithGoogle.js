import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { string } from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import classNames from "classnames";

import "./SignInWithGoogle.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";
import OutlinedButton from "../OutlinedButton/OutlinedButton";
import { signInWithGoogle } from "../../firebase/firebase";
import * as ROUTES from "../../constants/routes";
import { currentUserSelector } from "../../redux/user/user-selectors";

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
  let history = useHistory();
  let location = useLocation();

  const [loading, setLoading] = useState(false);

  let { from } = location.state || { from: { pathname: "/" } };

  const buttonClassNames = classNames({
    SignInWithGoogle: true,
    ...addedClasses,
  });

  useEffect(() => {
    /**
     * Don’t redirect until the `currentUser` has been stored in state.
     * The `currentUser` info is needed to fetch the data
     * from the firestore collections based on the user’s `uid`
     */
    if (currentUser) {
      setLoading(false);
      /**
       * If the user clicks the `Back` button,
       * redirect to the url visited before logging in.
       *
       * You don’t want to go `back` to `/login` once you logged in,
       * instead you’d want to go back to the page you were on before `/login`.
       */
      history.replace(from);
      history.push(ROUTES.INBOX);
    }
  }, [currentUser, from, history]);

  function handleSignInWithGoogle() {
    setLoading(true);
    signInWithGoogle().catch((event) => console.error(event.message));
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
