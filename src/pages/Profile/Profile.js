import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";

import "./Profile.styles.scss";
import DashboardMainContainer from "../../redux/containers/components/DashboardMainContainer";
import HeaderContainer from "../../redux/containers/components/HeaderContainer";
import withProtectedRoute from "../../hoc/withProtectedRoute";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import TextButton from "../../components/TextButton/TextButton";
import Input from "../../components/Input/Input";
import ValidationErrorMessage from "../../components/ValidationErrorMessage/ValidationErrorMessage";
import { storage } from "../../firebase/firebase";
import { getUserDocumentRef } from "../../utils/firebase/createUserProfileDocument";
import avatarPlaceholder from "../../assets/img/avatar-placeholder.png";

async function getUserRef(userId) {
  return getUserDocumentRef(userId);
}

function createObjectURL(object) {
  return window.URL
    ? window.URL.createObjectURL(object)
    : window.webkitURL.createObjectURL(object);
}

/**
 * Each of these must be released by calling URL.revokeObjectURL()
 * when you no longer need them.
 * Browsers will release object URLs automatically when the document is unloaded;
 * however, for optimal performance and memory usage,
 * if there are safe times when you can explicitly unload them, you should do so.
 */
function revokeObjectURL(url) {
  return window.URL
    ? window.URL.revokeObjectURL(url)
    : window.webkitURL.revokeObjectURL(url);
}

function Profile({ currentUser: { id, displayName, email, avatar } = {} }) {
  const [newDisplayName, setNewDisplayName] = useState(displayName || "");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [imageSrcUrl, setImageSrcUrl] = useState("");
  const fileRef = useRef(null);
  const imageRef = useRef(null);

  const imageClassNames = classNames({
    Profile__Page__Image: true,
    [`Profile__Page__Image--Loaded`]: avatar ? true : false,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const userRef = await getUserRef(id).catch((errorMessage) => {
      setErrors((prevErrors) => [...prevErrors, errorMessage]);
    });

    if (fileRef.current && fileRef.current.files.length) {
      const file = fileRef.current.files[0];

      const fileName = file.name || "profile_image";

      // Reference to the user buckets
      // user-profiles/<user-id>/<file-name>
      try {
        storage
          .ref()
          .child("user-profiles")
          .child(id)
          .child(fileName)
          .put(file)
          .then((response) => response.ref.getDownloadURL())
          .then((photoURL) => userRef.update({ photoURL }))
          .then(() => {
            setLoading(false);
            setImageSrcUrl("");
            setSelectedFileName("");
            if (imageSrcUrl) {
              revokeObjectURL(imageSrcUrl);
            }

            // Reset the input type="file" after uploading the image
            if (fileRef.current) {
              fileRef.current.value = "";
            }
          })
          .catch((error) => {
            setErrors((prevErrors) => [...prevErrors, error.message]);
            setLoading(false);
          });
      } catch (error) {
        setErrors((prevErrors) => [...prevErrors, error.message]);
        setLoading(false);
      }
    }

    if (newDisplayName) {
      await userRef
        .update({ displayName: newDisplayName })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          setErrors((prevErrors) => [...prevErrors, error.message]);
          setLoading(false);
        });
    }
  }

  function handleImageError() {
    if (imageRef.current) {
      imageRef.current.src = avatarPlaceholder;
    }
  }

  async function removeUserPhoto() {
    setLoading(true);

    const userRef = await getUserRef(id).catch((errorMessage) => {
      setErrors((prevErrors) => [...prevErrors, errorMessage]);
    });

    await userRef
      .update({ photoURL: "" })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setErrors((prevErrors) => [...prevErrors, error.message]);
        setLoading(false);
      });
  }

  /**
   * Change the avatar image src to be the selected file from the user’s filesystem.
   */
  function handleFileInputChange(e) {
    if (fileRef.current && fileRef.current.files.length) {
      const file = e.target.files[0];
      try {
        const newImageSrc = createObjectURL(file);
        setImageSrcUrl(newImageSrc);

        const fileName = file.name || "profile_image";

        setSelectedFileName(fileName);

        if (imageRef.current) {
          imageRef.current.src = newImageSrc;
        }
      } catch (error) {
        setErrors((prevErrors) => [...prevErrors, error.message]);
      }
    }
  }

  useEffect(() => {
    return () => {
      if (imageSrcUrl) {
        revokeObjectURL(imageSrcUrl);
      }
    };
  });

  return (
    <>
      <HeaderContainer />
      <DashboardMainContainer>
        <section className="Section" aria-labelledby="profile">
          <h1 className="Profile__Page__Header" id="profile">
            Account settings
          </h1>
          <header className="Profile__Page__ImageContainer">
            <img
              className={imageClassNames}
              src={avatar ? avatar : avatarPlaceholder}
              alt={`User avatar`}
              ref={imageRef}
              onError={handleImageError}
            />
            <div className="Profile__Page__UserInfo">
              {displayName && (
                <h2 className="Profile__Page__DisplayName">{displayName}</h2>
              )}
              {email && <p className="Profile__Page__Email">{email}</p>}
            </div>
          </header>
          <div className="Profile__Page__Buttons">
            <div className="Profile__Page__Buttons__Row">
              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleFileInputChange}
                onClick={(event) => {
                  event.target.value = null;
                }}
                ref={fileRef}
                className="Profile__Page__FileInput"
              />
              <label htmlFor="file-input">
                {selectedFileName ? "Image selected" : "Upload new photo"}
              </label>
              <TextButton
                type="submit"
                size="s"
                disabled={loading}
                onClick={removeUserPhoto}
              >
                Remove photo
              </TextButton>
            </div>
            {selectedFileName && (
              <p className="Profile__Page__FileNameSelected">
                {selectedFileName}
              </p>
            )}
          </div>
          <form
            method="post"
            onSubmit={handleSubmit}
            aria-label="Change account name"
          >
            <Input
              name="name"
              label="Full name*"
              placeholder="Full name"
              additionalClasses="Profile__Page__Input"
              autoComplete="name"
              autoCorrect="off"
              autoCapitalize="off"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
            />

            <PrimaryButton
              additionalClasses="Profile__Submit__PageBtn"
              type="submit"
              disabled={loading}
              size="m"
            >
              Save changes
            </PrimaryButton>
            {errors && (
              <>
                {errors.map((error, index) => (
                  <ValidationErrorMessage
                    key={index}
                    additionalClasses="Profile_Page__SignUpErrorMsg"
                  >
                    {error}
                  </ValidationErrorMessage>
                ))}
              </>
            )}
          </form>
        </section>
      </DashboardMainContainer>
    </>
  );
}

export default withProtectedRoute()(Profile);
