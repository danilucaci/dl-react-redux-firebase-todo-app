import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { array, bool, shape, func } from "prop-types";
import "./Login.styles.scss";

import * as ROUTES from "../../constants/routes";

import LinkButton from "../../components/LinkButton/LinkButton";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SignInWithGoogle from "../../components/SignInWithGoogle/SignInWithGoogle";
import Input from "../../components/Input/Input";
import OrDivider from "../../components/OrDivider/OrDivider";
import ValidationErrorMessage from "../../components/ValidationErrorMessage/ValidationErrorMessage";

function Login({
  userState: { loginErrors, isAuthenticated } = {},
  setLoginErrors,
  loginUser,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    /**
     * Don’t redirect until the `currentUser` has been stored in state.
     * The `currentUser` info is needed to fetch the data
     * from the firestore collections based on the user’s `uid`
     */
    if (isAuthenticated) {
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
  }, [isAuthenticated, from, history]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    await loginUser(email, password)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setLoginErrors(error.message);
      });
  }

  return (
    <section className="Login" aria-labelledby="login">
      <h1 className="Login__Title" id="login">
        Log in
      </h1>

      <SignInWithGoogle additionalClasses="Login__GoogleBtn" />
      <OrDivider additionalClasses="Login__OrDivider" />
      <form
        method="post"
        onSubmit={handleLogin}
        aria-label="login with email and password"
      >
        <Input
          name="email"
          label="Email address*"
          placeholder="Email address"
          additionalClasses="Login__Input"
          autoComplete="email"
          autoCorrect="off"
          autoCapitalize="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          label="Password*"
          placeholder="Password"
          additionalClasses="Login__Input"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PrimaryButton
          additionalClasses="Login__SubmitBtn"
          type="submit"
          disabled={loading}
        >
          Log in
        </PrimaryButton>
        {loginErrors && loginErrors.length ? (
          <>
            {loginErrors.map((error, index) => (
              <ValidationErrorMessage
                key={index}
                additionalClasses="Login__SignUpErrorMsg"
              >
                {error}
              </ValidationErrorMessage>
            ))}
            <hr className="Login__Divider" />
          </>
        ) : null}
      </form>

      <nav className="Login__ButtonsNav" aria-label="reset password or sign up">
        <LinkButton
          additionalClasses="Login__PasswordReset"
          size="s"
          aria-label="request password reset"
          to={ROUTES.PASSWORD_RESET}
        >
          Forgot password?
        </LinkButton>
        <hr className="Login__Divider" />
        <div className="Login__Footer">
          <p>Don’t have an account?</p>
          <LinkButton
            additionalClasses="Login__Footer__Btn"
            size="s"
            aria-label="sign up for a new account"
            to={ROUTES.SIGN_UP}
          >
            Sign up
          </LinkButton>
        </div>
      </nav>
    </section>
  );
}

Login.propTypes = {
  userState: shape({
    loginErrors: array.isRequired,
    isAuthenticated: bool.isRequired,
  }).isRequired,
  setLoginErrors: func.isRequired,
  loginUser: func.isRequired,
};

export default Login;
