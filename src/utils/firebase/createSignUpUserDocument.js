import getCurrentUserDataFromSnapshot from "./getCurrentUserDataFromSnapshot";
import { createUserProfileDocument } from "./createUserProfileDocument";
import { isEmptyObj } from "../helpers";

export async function createSignUpUserDocument(user = {}, additionalData = {}) {
  if (isEmptyObj(user) || !user.hasOwnProperty("email")) {
    return Promise.reject("Failed to get the user document. No user provided");
  }

  const userRef = await createUserProfileDocument(user, additionalData).catch(
    (error) => {
      return Promise.reject(error);
    },
  );

  const snapshot = await userRef.get().catch((error) => {
    return Promise.reject(error.message);
  });

  if (snapshot.exists) {
    return getCurrentUserDataFromSnapshot(snapshot);
  } else {
    return Promise.reject("Failed to create the user. User not found");
  }
}
