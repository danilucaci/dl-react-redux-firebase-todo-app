import React, { useState } from "react";

import "./PasswordReset.styles.scss";
import HomePageHeaderContainer from "../../redux/containers/components/HomePageHeaderContainer";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Input from "../../components/Input/Input";

function PasswordReset() {
  const [email, setEmail] = useState("");

  function handlePasswordReset(e) {
    e.preventDefault();
  }

  return (
    <>
      <HomePageHeaderContainer />
      <section className="PasswordReset">
        <header className="">
          <h1 className="PasswordReset__Title">Reset your password</h1>
        </header>
        <section>
          <p className="PasswordReset__Copy">
            Type in your email address below and we'll send you an email with
            instructions on how to create a new password.
          </p>
          <form method="post" onSubmit={handlePasswordReset}>
            <Input
              name="email"
              label="Email address*"
              placeholder="Email address"
              additionalClasses="PasswordReset__Input"
              autoComplete="email"
              autoCorrect="off"
              autoCapitalize="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PrimaryButton
              additionalClasses="PasswordReset__SubmitBtn"
              type="submit"
            >
              Reset password
            </PrimaryButton>
          </form>
        </section>
      </section>
    </>
  );
}

export default PasswordReset;
