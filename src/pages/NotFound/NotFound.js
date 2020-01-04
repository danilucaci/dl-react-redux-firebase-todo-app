import React from "react";

import "./NotFound.styles.scss";
import AppMain from "../../components/AppMain/AppMain";
import HomePageHeaderContainer from "../../redux/containers/components/HomePageHeaderContainer";

function NotFound() {
  console.log("Not found");
  return (
    <>
      <HomePageHeaderContainer />
      <AppMain>
        <section className="Section">
          <h1>NotFound page</h1>
        </section>
      </AppMain>
    </>
  );
}

export default NotFound;
