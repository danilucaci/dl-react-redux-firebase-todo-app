import React from "react";

import "./Profile.styles.scss";
import DashboardMainContainer from "../../redux/containers/components/DashboardMainContainer";
import withProtectedRoute from "../../hoc/withProtectedRoute";

function Profile({ currentUser }) {
  return (
    <DashboardMainContainer>
      <section className="Section">
        <h1>Profile page</h1>
        {currentUser && currentUser.displayName && (
          <p>Hello {currentUser.displayName}</p>
        )}
      </section>
    </DashboardMainContainer>
  );
}

export default withProtectedRoute()(Profile);
