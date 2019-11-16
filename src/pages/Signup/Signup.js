import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { array, bool, shape, func } from "prop-types";
import "./Signup.styles.scss";

import * as ROUTES from "../../constants/routes";

import LinkButton from "../../components/LinkButton/LinkButton";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SignInWithGoogle from "../../components/SignInWithGoogle/SignInWithGoogle";
import Input from "../../components/Input/Input";
import OrDivider from "../../components/OrDivider/OrDivider";
import ValidationErrorMessage from "../../components/ValidationErrorMessage/ValidationErrorMessage";

function Signup({
  userState: { signupErrors, signupLoading, isAuthenticated } = {},
  signUpWithEmailRequest,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  async function handleSignup(e) {
    e.preventDefault();

    await signUpWithEmailRequest(email, password, name);
  }

  return (
    <section className="Signup">
      <header className="">
        <h1 className="Signup__Title">Sign up</h1>
      </header>
      <section>
        <SignInWithGoogle
          additionalClasses="Signup__GoogleBtn"
          label="Sign up with Google"
        />
        <OrDivider additionalClasses="Signup__OrDivider" />
        <form method="post" onSubmit={handleSignup}>
          <Input
            name="name"
            label="Full name*"
            placeholder="Full name"
            additionalClasses="Signup__Input"
            autoComplete="name"
            autoCorrect="off"
            autoCapitalize="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="email"
            label="Email address*"
            placeholder="Email address"
            additionalClasses="Signup__Input"
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
            additionalClasses="Signup__Input"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PrimaryButton
            additionalClasses="Signup__SubmitBtn"
            type="submit"
            disabled={signupLoading}
          >
            Sign up
          </PrimaryButton>
          {signupErrors && signupErrors.length ? (
            <>
              {signupErrors.map((error, index) => (
                <ValidationErrorMessage
                  key={index}
                  additionalClasses="Signup__SignUpErrorMsg"
                >
                  {error}
                </ValidationErrorMessage>
              ))}
              <hr className="Signup__Divider" />
            </>
          ) : null}
        </form>
      </section>
      <nav className="Signup__ButtonsNav">
        <hr className="Signup__Divider" />
        <div className="Signup__Footer">
          <p>Already have an account?</p>
          <LinkButton
            additionalClasses="Signup__Footer__Btn"
            size="s"
            aria-label="log into your account"
            to={ROUTES.LOGIN}
          >
            Log in
          </LinkButton>
        </div>
      </nav>
    </section>
  );
}

Signup.propTypes = {
  userState: shape({
    signupErrors: array.isRequired,
    signupLoading: bool.isRequired,
    isAuthenticated: bool.isRequired,
  }).isRequired,
  signUpWithEmailRequest: func.isRequired,
};

export default Signup;
