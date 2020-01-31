import React from "react";

import "./NotFound.styles.scss";
import AppMain from "../../components/AppMain/AppMain";
import HomePageHeaderContainer from "../../redux/containers/components/HomePageHeaderContainer";
import SEO from "../../components/SEO/SEO";
import seo from "../../utils/seo";

function NotFound() {
  return (
    <>
      <SEO title={seo.pages.notFound.title} />
      <HomePageHeaderContainer />
      <AppMain>
        <section className="NotFound row row--contain-8 Section">
          <div className="col">
            <span aria-hidden="true" className="NotFound__404">
              404
            </span>
            <h1 className="NotFound__Title">
              Sorry, this page wasn’t found{" "}
              <span role="img" aria-label="Sad face emoji">
                😔
              </span>
            </h1>
            <p className="NotFound__Copy">
              You have arrived at this 404 page because the page you asked for
              wasn’t found on todos.danilucaci.com.
            </p>
            <a href="/">Go back to the home page</a>
          </div>
        </section>
      </AppMain>
    </>
  );
}

export default NotFound;
