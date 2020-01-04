import React from "react";

import "./NotFound.styles.scss";
import AppMain from "../../components/AppMain/AppMain";
import HomePageHeaderContainer from "../../redux/containers/components/HomePageHeaderContainer";
import SEO from "../../components/SEO/SEO";
import seo from "../../utils/seo";

function NotFound() {
  console.log("Not found");
  return (
    <>
      <SEO title={seo.pages.notFound.title} />
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
