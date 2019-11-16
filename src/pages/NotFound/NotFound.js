import React from "react";

import "./NotFound.styles.scss";
import AppMain from "../../components/AppMain/AppMain";

function NotFound() {
  console.log("Not found");
  return (
    <AppMain>
      <section className="Section">
        <h1>NotFound page</h1>
      </section>
    </AppMain>
  );
}

export default NotFound;
