import React, { useState, useEffect } from "react";
import { arrayOf, oneOf, shape, oneOfType, string } from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import "./Signup.styles.scss";

import * as ROUTES from "../../constants/routes";

import LinkButton from "../../components/LinkButton/LinkButton";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SignInWithGoogle from "../../components/SignInWithGoogle/SignInWithGoogle";
import Input from "../../components/Input/Input";
import OrDivider from "../../components/OrDivider/OrDivider";
import ValidationErrorMessage from "../../components/ValidationErrorMessage/ValidationErrorMessage";

import { auth } from "../../firebase/firebase";
import { getUserDocumentRef } from "../../utils/firebase/createUserProfileDocument";

function Signup({ currentUser = null }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    function redirect() {
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

    /**
     * Don’t redirect until the `currentUser` has been stored in state.
     * The `currentUser` info is needed to fetch the data
     * from the firestore collections based on the user’s `uid`
     */
    if (currentUser) {
      /**
       * Only when signing up with email and `name` is changed in the form
       * and the `currentUser` created by withAuth doesn’t have a `displayName`.
       * SignInWithGoogle will have a displayName from the google account.
       */
      if (name && !currentUser.displayName) {
        setEmailSignUpDisplayName(currentUser.id);
      }

      redirect();
    }

    async function setEmailSignUpDisplayName(currentUserID) {
      const userRef = await getUserDocumentRef(currentUserID);

      if (typeof userRef === "string") {
        setLoading(false);
        setSignUpError(userRef);
      } else {
        await userRef
          .update({
            displayName: name,
          })
          .then(() => {
            redirect();
          })
          .catch((error) => {
            setLoading(false);
            setSignUpError(error.message);
          });
      }
    }
  }, [currentUser, from, history, name]);

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);

    await auth
      .createUserWithEmailAndPassword(email, password)
      .catch(function handleEmailSignUpError(error) {
        setLoading(false);
        setSignUpError(error.message);
      });
  }

  useEffect(() => {
    if (signUpError) {
      console.log(signUpError);
    }
  }, [signUpError]);

  return (
    <section className="Signup">
      <header className="">
        <h1 className="Signup__Title">Sign up</h1>
      </header>
      <section>
        <SignInWithGoogle additionalClasses="Signup__GoogleBtn" />
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
            disabled={loading}
          >
            Sign up
          </PrimaryButton>
          {signUpError && (
            <ValidationErrorMessage additionalClasses="Signup__SignUpErrorMsg">
              {signUpError}
            </ValidationErrorMessage>
          )}
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
  currentUser: oneOfType([
    shape({
      id: string,
      displayName: string,
      email: string,
      avatar: string,
      role: arrayOf(string),
    }),
    oneOf([null]),
  ]),
};

Signup.defaultProps = {
  currentUser: null,
};

export default Signup;
