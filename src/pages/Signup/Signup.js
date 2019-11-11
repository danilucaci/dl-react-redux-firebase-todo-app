import React, { useState } from "react";

import "./Signup.styles.scss";

import * as ROUTES from "../../constants/routes";

import LinkButton from "../../components/LinkButton/LinkButton";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SignUpWithGoogle from "../../components/SignUpWithGoogle/SignUpWithGoogle";
import Input from "../../components/Input/Input";
import OrDivider from "../../components/OrDivider/OrDivider";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(e) {
    e.preventDefault();
  }

  return (
    <section className="Signup">
      <header className="">
        <h1 className="Signup__Title">Sign up</h1>
      </header>
      <section>
        <SignUpWithGoogle additionalClasses="Signup__GoogleBtn" />
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PrimaryButton additionalClasses="Signup__SubmitBtn" type="submit">
            Sign up
          </PrimaryButton>
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

export default Signup;
