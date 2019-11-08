import React from "react";

import "./Profile.styles.scss";
import AppMainContainer from "../../redux/containers/components/AppMainContainer";
import withProtectedRoute from "../../hoc/withProtectedRoute";

function Profile() {
  return (
    <AppMainContainer>
      <section className="Section">
        <h1>Profile page</h1>
      </section>
    </AppMainContainer>
  );
}

export default withProtectedRoute()(Profile);
