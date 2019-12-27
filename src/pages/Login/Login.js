import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { array, bool, shape, func } from "prop-types";
import "./Login.styles.scss";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import * as ROUTES from "../../constants/routes";

import LinkButton from "../../components/LinkButton/LinkButton";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SignInWithGoogle from "../../components/SignInWithGoogle/SignInWithGoogle";
import Input from "../../components/Input/Input";
import OrDivider from "../../components/OrDivider/OrDivider";
import ValidationErrorMessage from "../../components/ValidationErrorMessage/ValidationErrorMessage";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email to login.")
    .required("Please enter a valid email to login."),
  password: Yup.string()
    .required("Please enter your password to login.")
    .min(6, "The password needs to be 6 characters or longer."),
});

function Login({
  userState: { loginErrors, isAuthenticated } = {},
  setLoginErrors,
  loginUser,
  clearLoginError,
}) {
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  let location = useLocation();

  const clearErrorsTimeoutRef = useRef(null);

  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (loginErrors && loginErrors.length > 0) {
      clearErrorsTimeoutRef.current = setTimeout(() => {
        clearLoginError();
      }, 5000);
    }

    return () => {
      if (clearErrorsTimeoutRef.current) {
        clearTimeout(clearErrorsTimeoutRef.current);
      }
    };
  }, [clearLoginError, loginErrors]);

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

  async function handleLogin(values) {
    setLoading(true);

    await loginUser(values.email, values.password)
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

      <SignInWithGoogle
        additionalClasses="Login__GoogleBtn"
        loading={signupLoading}
      />
      <OrDivider />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          handleLogin(values);
        }}
      >
        {({ handleSubmit, isValid, touched, errors }) => (
          <Form
            onSubmit={handleSubmit}
            aria-label="login with email and password"
          >
            <Field
              as={Input}
              name="email"
              label="Email address*"
              placeholder="Email address"
              aria-describedby="email-validation"
              aria-required="true"
              aria-invalid={touched.email && errors.email ? `true` : `false`}
              labelAdditionalClasses="Login__Label"
              autoComplete="email"
              autoCorrect="off"
              autoCapitalize="off"
            />
            {touched.email && errors.email && (
              <ValidationErrorMessage
                additionalClasses="Login__InlineErrorMsg"
                id="email-validation"
                aria-hidden="true"
              >
                {errors.email}
              </ValidationErrorMessage>
            )}
            <Field
              as={Input}
              type="password"
              name="password"
              label="Password*"
              placeholder="Password"
              aria-describedby="password-validation"
              aria-required="true"
              aria-invalid={
                touched.password && errors.password ? `true` : `false`
              }
              labelAdditionalClasses="Login__Label"
              autoComplete="current-password"
            />
            {touched.password && errors.password && (
              <ValidationErrorMessage
                additionalClasses="Login__InlineErrorMsg"
                id="password-validation"
                aria-hidden="true"
              >
                {errors.password}
              </ValidationErrorMessage>
            )}
            <PrimaryButton
              additionalClasses="Login__SubmitBtn"
              type="submit"
              disabled={loading || !isValid}
              aria-label={`log${loading ? `ging` : ``} in`}
              loading={loading}
            >
              Log in
            </PrimaryButton>
            {loginErrors && loginErrors.length ? (
              <>
                {loginErrors.map((error, index) => (
                  <ValidationErrorMessage
                    key={index}
                    additionalClasses="Login__SignUpErrorMsg"
                    role="status"
                    aria-live="polite"
                  >
                    {error}
                  </ValidationErrorMessage>
                ))}
                <hr className="Login__Divider" />
              </>
            ) : null}
          </Form>
        )}
      </Formik>

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
  clearLoginError: func.isRequired,
};

export default Login;
