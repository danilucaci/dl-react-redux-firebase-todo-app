import React from "react";
import classnames from "classnames";

import "./Project.styles.scss";
import Main from "../../components/Main/Main";

function Project(props) {
  const { match } = props;

  return (
    <Main>
      <section className="Section">
        <h1>Project page</h1>
        <p>{match.params.projectID}</p>
      </section>
    </Main>
  );
}

export default Project;
