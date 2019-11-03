import React, { useState } from "react";

import "./Login.styles.scss";

import LinkButton from "../../components/LinkButton/LinkButton";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SignInWithGoogle from "../../components/SignInWithGoogle/SignInWithGoogle";
import Input from "../../components/Input/Input";
import OrDivider from "../../components/OrDivider/OrDivider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
  }

  return (
    <section className="Login">
      <header className="">
        <h1 className="Login__Title">Log in</h1>
      </header>
      <section>
        <SignInWithGoogle additionalClasses="Login__GoogleBtn" />
        <OrDivider additionalClasses="Login__OrDivider" />
        <form method="post" onSubmit={handleLogin}>
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
          <PrimaryButton additionalClasses="Login__SubmitBtn" type="submit">
            Log in
          </PrimaryButton>
        </form>
      </section>
      <nav className="Login__ButtonsNav">
        <LinkButton
          additionalClasses="LinkButton--Small Login__PasswordReset"
          aria-label="request password reset"
          to="/password-reset"
        >
          Forgot password?
        </LinkButton>
        <hr className="Login__Divider" />
        <div className="Login__Footer">
          <p>Don’t have an account?</p>
          <LinkButton
            additionalClasses="LinkButton--Small Login__Footer__Btn"
            aria-label="sign up for a new account"
            to="/signup"
          >
            Sign up
          </LinkButton>
        </div>
      </nav>
    </section>
  );
}

export default Login;
