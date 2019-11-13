import React, { useState, useRef } from "react";

import "./Profile.styles.scss";
import DashboardMainContainer from "../../redux/containers/components/DashboardMainContainer";
import withProtectedRoute from "../../hoc/withProtectedRoute";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Input from "../../components/Input/Input";
import ValidationErrorMessage from "../../components/ValidationErrorMessage/ValidationErrorMessage";
import { storage } from "../../firebase/firebase";
import { getUserDocumentRef } from "../../utils/firebase/createUserProfileDocument";

function Profile({ currentUser }) {
  const [displayName, setDisplayName] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const userRef = getUserDocumentRef(currentUser.id);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (fileRef.current && fileRef.current.files.length) {
      const file = fileRef.current.files[0];
      console.log(fileRef.current.files);

      const fileName = file.name || "profile_image";

      // Reference to the user buckets
      // user-profiles/<user-id>/<file-name>
      try {
        storage
          .ref()
          .child("user-profiles")
          .child(currentUser.id)
          .child(fileName)
          .put(file)
          .then((response) => response.ref.getDownloadURL())
          .then((photoURL) => userRef.update({ photoURL }))
          .catch((error) => {
            setErrors((prevErrors) => [...prevErrors, error]);
            setLoading(false);
          });
      } catch (error) {
        setErrors((prevErrors) => [...prevErrors, error]);
        setLoading(false);
      }
    }

    if (displayName) {
      console.log(displayName);

      await userRef
        .update({ displayName })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          setErrors((prevErrors) => [...prevErrors, error]);
          setLoading(false);
          console.error(error);
        });
    }
  }

  return (
    <DashboardMainContainer>
      <section className="Section">
        <h1>Profile page</h1>
        {currentUser && currentUser.displayName && (
          <p>Hello {currentUser.displayName}</p>
        )}
        <form method="post" onSubmit={handleSubmit}>
          <Input
            name="name"
            label="Full name*"
            placeholder="Full name"
            additionalClasses="Profile__Input"
            autoComplete="name"
            autoCorrect="off"
            autoCapitalize="off"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input type="file" ref={fileRef} />
          <PrimaryButton
            additionalClasses="Profile__SubmitBtn"
            type="submit"
            disabled={loading}
          >
            Update
          </PrimaryButton>
          {errors && (
            <>
              {errors.map((error) => (
                <ValidationErrorMessage additionalClasses="Profile__SignUpErrorMsg">
                  {error}
                </ValidationErrorMessage>
              ))}
            </>
          )}
        </form>
      </section>
    </DashboardMainContainer>
  );
}

export default withProtectedRoute()(Profile);
