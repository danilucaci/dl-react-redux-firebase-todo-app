import React, { useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { array, bool, shape, func } from "prop-types";
import "./Signup.styles.scss";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import * as ROUTES from "../../constants/routes";

import LinkButton from "../../components/LinkButton/LinkButton";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SignInWithGoogle from "../../components/SignInWithGoogle/SignInWithGoogle";
import Input from "../../components/Input/Input";
import OrDivider from "../../components/OrDivider/OrDivider";
import ValidationErrorMessage from "../../components/ValidationErrorMessage/ValidationErrorMessage";

const sigupSchema = Yup.object().shape({
  fullname: Yup.string().required("Please enter your full name to sign up."),
  email: Yup.string()
    .email("Please enter a valid email to sign up.")
    .required("Please enter a valid email to sign up."),
  password: Yup.string()
    .required("Please enter your password to sign up.")
    .min(6, "The password needs to be 6 characters or longer."),
});

function Signup({
  userState: { signupErrors, signupLoading, isAuthenticated } = {},
  signUpWithEmailRequest,
  clearSignupError,
}) {
  const clearErrorsTimeoutRef = useRef(null);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (signupErrors && signupErrors.length > 0) {
      clearErrorsTimeoutRef.current = setTimeout(() => {
        clearSignupError();
      }, 5000);
    }

    return () => {
      if (clearErrorsTimeoutRef.current) {
        clearTimeout(clearErrorsTimeoutRef.current);
      }
    };
  }, [clearSignupError, signupErrors]);

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

  async function handleSignup(values) {
    await signUpWithEmailRequest(
      values.email,
      values.password,
      values.fullname,
    );
  }

  return (
    <section className="Signup" aria-labelledby="sign-up">
      <h1 className="Signup__Title" id="sign-up">
        Sign up
      </h1>

      <SignInWithGoogle
        additionalClasses="Signup__GoogleBtn"
        label="Sign up with Google"
        loading={signupLoading}
      />
      <OrDivider additionalClasses="Signup__OrDivider" />
      <Formik
        initialValues={{
          fullname: "",
          email: "",
          password: "",
        }}
        validationSchema={sigupSchema}
        onSubmit={(values) => {
          handleSignup(values);
        }}
      >
        {({ handleSubmit, isValid, touched, errors }) => (
          <Form
            onSubmit={handleSubmit}
            aria-label="sign up with email and password"
          >
            <Field
              as={Input}
              name="fullname"
              label="Full name*"
              placeholder="Full name"
              aria-describedby="fullname-validation"
              aria-required="true"
              aria-invalid={
                touched.fullname && errors.fullname ? `true` : `false`
              }
              labelAdditionalClasses="Signup__Label"
              autoComplete="name"
              autoCorrect="off"
              autoCapitalize="off"
            />
            {touched.fullname && errors.fullname && (
              <ValidationErrorMessage
                additionalClasses="Signup__InlineErrorMsg"
                id="fullname-validation"
                aria-hidden="true"
              >
                {errors.fullname}
              </ValidationErrorMessage>
            )}
            <Field
              as={Input}
              name="email"
              label="Email address*"
              placeholder="Email address"
              aria-describedby="email-validation"
              aria-required="true"
              aria-invalid={touched.email && errors.email ? `true` : `false`}
              labelAdditionalClasses="Signup__Label"
              autoComplete="email"
              autoCorrect="off"
              autoCapitalize="off"
            />
            {touched.email && errors.email && (
              <ValidationErrorMessage
                additionalClasses="Signup__InlineErrorMsg"
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
              labelAdditionalClasses="Signup__Label"
              autoComplete="new-password"
            />
            {touched.password && errors.password && (
              <ValidationErrorMessage
                additionalClasses="Signup__InlineErrorMsg"
                id="password-validation"
                aria-hidden="true"
              >
                {errors.password}
              </ValidationErrorMessage>
            )}
            <PrimaryButton
              additionalClasses="Signup__SubmitBtn"
              type="submit"
              disabled={signupLoading || !isValid}
              loading={signupLoading}
              aria-label={`sign${signupLoading ? `ing` : ``} up`}
            >
              Sign up
            </PrimaryButton>
            {signupErrors && signupErrors.length ? (
              <>
                {signupErrors.map((error, index) => (
                  <ValidationErrorMessage
                    key={index}
                    additionalClasses="Signup__SignUpErrorMsg"
                    role="status"
                    aria-live="polite"
                  >
                    {error}
                  </ValidationErrorMessage>
                ))}
                <hr className="Signup__Divider" />
              </>
            ) : null}
          </Form>
        )}
      </Formik>

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
  clearSignupError: func.isRequired,
};

export default Signup;
